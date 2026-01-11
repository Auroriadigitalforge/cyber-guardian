import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReports, PublicReport, ReportStatus } from "@/hooks/useReports";
import { Search, FileText, Clock, Shield, MapPin, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { scamTypes } from "@/data/cyberData";

interface ReportTrackerProps {
  onClose: () => void;
}

export function ReportTracker({ onClose }: ReportTrackerProps) {
  const [reportNumber, setReportNumber] = useState("");
  const [report, setReport] = useState<PublicReport | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { getReportByNumber, getStatusLabel, getStatusColor, isLoading, error } = useReports();

  const handleSearch = async () => {
    if (!reportNumber.trim()) return;
    setHasSearched(true);
    const result = await getReportByNumber(reportNumber.trim().toUpperCase());
    setReport(result);
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "under_review":
        return <Search className="w-4 h-4" />;
      case "investigating":
        return <Shield className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <FileText className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const scam = report ? scamTypes.find(s => s.id === report.scam_type) : null;

  const getTimelineSteps = (currentStatus: ReportStatus) => {
    const allSteps: { status: ReportStatus; label: string }[] = [
      { status: "pending", label: "Report Received" },
      { status: "under_review", label: "Under Review" },
      { status: "investigating", label: "Investigation" },
      { status: "resolved", label: "Resolved" },
    ];

    const statusOrder: ReportStatus[] = ["pending", "under_review", "investigating", "resolved", "closed"];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return allSteps.map((step, index) => ({
      ...step,
      isCompleted: statusOrder.indexOf(step.status) <= currentIndex,
      isCurrent: step.status === currentStatus,
    }));
  };

  return (
    <div className="space-y-6 slide-up">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Track Your Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Enter your report number to check the investigation status.
          </p>
          <div className="flex gap-3">
            <Input
              placeholder="e.g., CS-IN-20250111-0001"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button variant="glow" onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && !isLoading && (
        <>
          {report ? (
            <Card variant="glow" className="fade-in">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Report Found</CardTitle>
                      <p className="text-sm text-muted-foreground font-mono">{report.report_number}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    {getStatusLabel(report.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      Location
                    </div>
                    <div className="font-medium">{report.country_name}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <AlertTriangle className="w-3 h-3" />
                      Type
                    </div>
                    <div className="font-medium">{scam?.label || report.scam_type}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Clock className="w-3 h-3" />
                      Submitted
                    </div>
                    <div className="font-medium text-sm">
                      {new Date(report.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Shield className="w-3 h-3" />
                      Last Update
                    </div>
                    <div className="font-medium text-sm">
                      {new Date(report.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Investigation Progress</h3>
                  <div className="flex items-center justify-between">
                    {getTimelineSteps(report.status).map((step, index) => (
                      <div key={step.status} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              step.isCompleted
                                ? step.isCurrent
                                  ? "bg-primary text-primary-foreground box-glow"
                                  : "bg-primary/50 text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {step.isCompleted ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <span className={`text-xs mt-2 text-center max-w-[80px] ${step.isCurrent ? "text-primary font-medium" : "text-muted-foreground"}`}>
                            {step.label}
                          </span>
                        </div>
                        {index < 3 && (
                          <div className={`w-12 md:w-20 h-1 mx-2 rounded ${step.isCompleted ? "bg-primary/50" : "bg-secondary"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Department Info */}
                {report.assigned_department && (
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <p className="text-sm">
                      <span className="font-medium">Assigned to:</span>{" "}
                      {report.assigned_department}
                    </p>
                  </div>
                )}


                {/* Incident Description */}
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h4 className="text-sm font-medium mb-2">Your Report</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {report.incident_description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card variant="interactive" className="fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Report Not Found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find a report with that number. Please check and try again.
                </p>
                <p className="text-sm text-muted-foreground">
                  Report numbers look like: <span className="font-mono text-primary">CS-IN-20250111-0001</span>
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Button variant="outline" onClick={onClose} className="w-full">
        Back to Home
      </Button>
    </div>
  );
}
