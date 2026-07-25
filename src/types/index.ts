export type ConfidenceLevel = "high" | "medium" | "low" | "needs-confirmation";

export type CompanyConfig = {
  name: string;
  legalName: string;
  description: string;
  legal: {
    inn: string;
    ogrn: string;
    registrationDate: string;
  };
  office: {
    full: string;
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    floor: string;
    office: string;
  };
  coordinates: { latitude: number; longitude: number };
  schedule: {
    label: string;
    note: string;
    confidence: ConfidenceLevel;
  };
  phone: { display: string; e164: string };
  email: string | null;
  website: string | null;
  links: {
    whatsapp: string;
    telegram: string;
    vk: string;
    twoGis: string;
    twoGisReviews: string;
    directions: string;
    domclick: string;
    max: string | null;
  };
  rating: {
    value: number;
    ratingCount: number;
    reviewCount: number;
    source: string;
    checkedAt: string;
  };
};

export type Service = {
  id: string;
  title: string;
  description: string;
  proof: string;
};

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  experience: string;
  strengths: string[];
  photo: string | null;
  sourceUrl: string;
};

export type ReviewSummary = {
  topic: string;
  summary: string;
  attribution: string;
  sourceUrl: string;
};

export type FaqItem = { question: string; answer: string };

export type SourceRecord = {
  id: string;
  title: string;
  url: string;
  confirms: string;
  confidence: ConfidenceLevel;
  checkedAt: string;
  limitations?: string;
};

export type LeadFormType = "consultation" | "valuation";
export type PreferredContact = "phone" | "whatsapp" | "telegram";
export type TaskType =
  | "sell"
  | "buy"
  | "rent-out"
  | "rent"
  | "mortgage"
  | "documents"
  | "remote"
  | "other";

export type LeadPayload = {
  formType: LeadFormType;
  name: string;
  phone: string;
  preferredContact: PreferredContact;
  taskType: TaskType;
  addressOrDistrict?: string;
  rooms?: "studio" | "1" | "2" | "3" | "4+";
  comment?: string;
  submissionId: string;
  startedAt: number;
  website?: string;
};

export type LeadSuccessResponse = {
  ok: true;
  id: string;
  deliveredTo: string[];
};

export type LeadErrorResponse = {
  ok: false;
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type LeadResponse = LeadSuccessResponse | LeadErrorResponse;
