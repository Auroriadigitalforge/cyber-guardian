-- Create enum for report status
CREATE TYPE public.report_status AS ENUM ('pending', 'under_review', 'investigating', 'resolved', 'closed');

-- Create reports table
CREATE TABLE public.reports (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    report_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    country_code TEXT NOT NULL,
    country_name TEXT NOT NULL,
    scam_type TEXT NOT NULL,
    incident_description TEXT NOT NULL,
    platform_analyzed TEXT,
    ai_analysis TEXT,
    status report_status NOT NULL DEFAULT 'pending',
    assigned_department TEXT,
    investigator_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can insert reports (for anonymous reporting)
CREATE POLICY "Anyone can create reports"
ON public.reports
FOR INSERT
WITH CHECK (true);

-- Users can view their own reports (by report_number for anonymous users)
CREATE POLICY "Anyone can view reports by report number"
ON public.reports
FOR SELECT
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reports_updated_at
BEFORE UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate report number
CREATE OR REPLACE FUNCTION public.generate_report_number()
RETURNS TRIGGER AS $$
DECLARE
    country_prefix TEXT;
    sequence_num INTEGER;
BEGIN
    -- Get country prefix (first 2 chars uppercase)
    country_prefix := UPPER(SUBSTRING(NEW.country_code FROM 1 FOR 2));
    
    -- Get next sequence number for today
    SELECT COUNT(*) + 1 INTO sequence_num
    FROM public.reports
    WHERE DATE(created_at) = CURRENT_DATE;
    
    -- Format: CS-CC-YYYYMMDD-NNNN (CyberShield-CountryCode-Date-Sequence)
    NEW.report_number := 'CS-' || country_prefix || '-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD(sequence_num::TEXT, 4, '0');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to auto-generate report number
CREATE TRIGGER generate_report_number_trigger
BEFORE INSERT ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.generate_report_number();

-- Create index for faster lookups
CREATE INDEX idx_reports_report_number ON public.reports(report_number);
CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_reports_created_at ON public.reports(created_at DESC);