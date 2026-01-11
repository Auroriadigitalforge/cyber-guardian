-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view reports by report number" ON public.reports;

-- Create a secure function for public report lookups (excludes sensitive columns)
CREATE OR REPLACE FUNCTION public.get_report_by_number(p_report_number TEXT)
RETURNS TABLE (
  id UUID,
  report_number TEXT,
  country_code TEXT,
  country_name TEXT,
  scam_type TEXT,
  incident_description TEXT,
  platform_analyzed TEXT,
  status public.report_status,
  assigned_department TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    r.id,
    r.report_number,
    r.country_code,
    r.country_name,
    r.scam_type,
    r.incident_description,
    r.platform_analyzed,
    r.status,
    r.assigned_department,
    r.created_at,
    r.updated_at
  FROM public.reports r
  WHERE r.report_number = p_report_number
  LIMIT 1;
$$;

-- Create restrictive SELECT policy - only authenticated users can see their own reports
CREATE POLICY "Users can view their own reports"
ON public.reports
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);