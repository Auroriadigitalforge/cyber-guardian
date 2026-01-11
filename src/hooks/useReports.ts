import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ReportStatus = "pending" | "under_review" | "investigating" | "resolved" | "closed";

// Public report interface (excludes sensitive fields like ai_analysis, investigator_notes)
export interface PublicReport {
  id: string;
  report_number: string;
  country_code: string;
  country_name: string;
  scam_type: string;
  incident_description: string;
  platform_analyzed: string | null;
  status: ReportStatus;
  assigned_department: string | null;
  created_at: string;
  updated_at: string;
}

// Full report interface (for internal/admin use only)
export interface Report extends PublicReport {
  user_id: string | null;
  ai_analysis: string | null;
  investigator_notes: string | null;
}

interface CreateReportData {
  countryCode: string;
  countryName: string;
  scamType: string;
  incidentDescription: string;
  platformAnalyzed?: string;
  aiAnalysis?: string;
  assignedDepartment?: string;
}

export function useReports() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const createReport = async (data: CreateReportData): Promise<Report | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Use raw SQL via RPC or direct insert - types may not be synced yet
      const insertData = {
        country_code: data.countryCode,
        country_name: data.countryName,
        scam_type: data.scamType,
        incident_description: data.incidentDescription,
        platform_analyzed: data.platformAnalyzed || null,
        ai_analysis: data.aiAnalysis || null,
        assigned_department: data.assignedDepartment || null,
      };

      const { data: report, error: insertError } = await supabase
        .from("reports" as any)
        .insert(insertData as any)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Report Created",
        description: `Your report ${(report as any).report_number} has been submitted successfully.`,
      });

      return report as unknown as Report;
    } catch (err: any) {
      const message = err.message || "Failed to create report";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Use secure RPC function that excludes sensitive columns
  const getReportByNumber = async (reportNumber: string): Promise<PublicReport | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: reports, error: fetchError } = await supabase
        .rpc("get_report_by_number", { p_report_number: reportNumber });

      if (fetchError) {
        throw fetchError;
      }

      if (!reports || reports.length === 0) {
        setError("Report not found");
        return null;
      }

      return reports[0] as PublicReport;
    } catch (err: any) {
      const message = err.message || "Failed to fetch report";
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusLabel = (status: ReportStatus): string => {
    const labels: Record<ReportStatus, string> = {
      pending: "Pending Review",
      under_review: "Under Review",
      investigating: "Investigation in Progress",
      resolved: "Resolved",
      closed: "Case Closed",
    };
    return labels[status];
  };

  const getStatusColor = (status: ReportStatus): string => {
    const colors: Record<ReportStatus, string> = {
      pending: "bg-warning/20 text-warning",
      under_review: "bg-info/20 text-info",
      investigating: "bg-primary/20 text-primary",
      resolved: "bg-success/20 text-success",
      closed: "bg-muted text-muted-foreground",
    };
    return colors[status];
  };

  return {
    createReport,
    getReportByNumber,
    getStatusLabel,
    getStatusColor,
    isLoading,
    error,
  };
}
