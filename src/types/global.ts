// Global type definitions for the Acolhemente landing page

export interface BaseComponent {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  userType: 'parent' | 'professional' | 'clinic' | 'other';
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

// Accessibility-focused component props
export interface AccessibleComponentProps extends BaseComponent {
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}
