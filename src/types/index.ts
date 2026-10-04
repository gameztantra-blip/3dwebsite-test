export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ContactMessageRecord extends ContactFormData {
  id?: string;
  created_at?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  metrics: string;
}

export interface UseCaseItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techTags: string[];
  metricLabel: string;
  metricValue: string;
  workflowSteps: string[];
}
