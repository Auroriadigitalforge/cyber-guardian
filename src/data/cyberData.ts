export interface CountryInfo {
  name: string;
  code: string;
  flag: string;
  emergencyNumber: string;
  cyberCrimeUnit: string;
  website: string;
  email: string;
}

export const countries: CountryInfo[] = [
  {
    name: "India",
    code: "IN",
    flag: "🇮🇳",
    emergencyNumber: "1930",
    cyberCrimeUnit: "Indian Cyber Crime Coordination Centre (I4C)",
    website: "https://cybercrime.gov.in",
    email: "cybercrime@gov.in"
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    emergencyNumber: "1-800-372-8389",
    cyberCrimeUnit: "FBI Internet Crime Complaint Center (IC3)",
    website: "https://www.ic3.gov",
    email: "ic3@fbi.gov"
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    emergencyNumber: "0300 123 2040",
    cyberCrimeUnit: "Action Fraud - National Fraud & Cyber Crime Reporting",
    website: "https://www.actionfraud.police.uk",
    email: "actionfraud@police.uk"
  },
  {
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    emergencyNumber: "1-888-495-8501",
    cyberCrimeUnit: "Canadian Anti-Fraud Centre (CAFC)",
    website: "https://www.antifraudcentre-centreantifraude.ca",
    email: "info@antifraudcentre.ca"
  },
  {
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    emergencyNumber: "1300 292 371",
    cyberCrimeUnit: "Australian Cyber Security Centre (ACSC)",
    website: "https://www.cyber.gov.au",
    email: "asd.assist@defence.gov.au"
  },
  {
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    emergencyNumber: "0800 292 2000",
    cyberCrimeUnit: "Bundeskriminalamt (BKA) Cybercrime",
    website: "https://www.bka.de",
    email: "poststelle@bka.bund.de"
  },
  {
    name: "France",
    code: "FR",
    flag: "🇫🇷",
    emergencyNumber: "0 805 805 817",
    cyberCrimeUnit: "Cybermalveillance.gouv.fr",
    website: "https://www.cybermalveillance.gouv.fr",
    email: "contact@cybermalveillance.gouv.fr"
  },
  {
    name: "Japan",
    code: "JP",
    flag: "🇯🇵",
    emergencyNumber: "03-5805-1731",
    cyberCrimeUnit: "National Police Agency Cyber Division",
    website: "https://www.npa.go.jp",
    email: "cyber@npa.go.jp"
  },
  {
    name: "Brazil",
    code: "BR",
    flag: "🇧🇷",
    emergencyNumber: "181",
    cyberCrimeUnit: "SaferNet Brasil",
    website: "https://new.safernet.org.br",
    email: "denuncie@safernet.org.br"
  },
  {
    name: "Singapore",
    code: "SG",
    flag: "🇸🇬",
    emergencyNumber: "1800-255-0000",
    cyberCrimeUnit: "Singapore Police Force - Cybercrime Command",
    website: "https://www.police.gov.sg",
    email: "SPF_Cybercrime@spf.gov.sg"
  },
  {
    name: "South Africa",
    code: "ZA",
    flag: "🇿🇦",
    emergencyNumber: "086 001 0111",
    cyberCrimeUnit: "South African Police Service - Cybercrime",
    website: "https://www.saps.gov.za",
    email: "cybercrime@saps.gov.za"
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    emergencyNumber: "800 2626",
    cyberCrimeUnit: "UAE Cybersecurity Council",
    website: "https://www.tra.gov.ae",
    email: "aecert@tra.gov.ae"
  },
  
];

export const scamTypes = [
  { id: "whatsapp", label: "WhatsApp Scam", icon: "💬", description: "Fraudulent messages or calls on WhatsApp" },
  { id: "phishing", label: "Phishing Attack", icon: "🎣", description: "Fake emails or websites stealing credentials" },
  { id: "banking", label: "Banking Fraud", icon: "🏦", description: "Unauthorized transactions or fake banking apps" },
  { id: "romance", label: "Romance Scam", icon: "💔", description: "Fake romantic relationships for money" },
  { id: "investment", label: "Investment Fraud", icon: "📈", description: "Fake investment schemes or crypto scams" },
  { id: "job", label: "Job Scam", icon: "💼", description: "Fake job offers asking for money" },
  { id: "lottery", label: "Lottery/Prize Scam", icon: "🎰", description: "Fake lottery wins or prizes" },
  { id: "tech_support", label: "Tech Support Scam", icon: "🖥️", description: "Fake tech support calls or popups" },
  { id: "identity", label: "Identity Theft", icon: "🆔", description: "Someone using your personal information" },
  { id: "other", label: "Other Scam", icon: "⚠️", description: "Any other type of online fraud" }
];
