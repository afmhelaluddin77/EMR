/**
 * FHIR Types Package - Main Export
 * Shared TypeScript types for EMR system
 */

// Core FHIR Resources
export * from './patient';
export * from './appointment';
export * from './observation';
export * from './medication';
export * from './practitioner';

// Common FHIR Types
export interface Identifier {
  use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
  type?: CodeableConcept;
  system?: string;
  value?: string;
  period?: Period;
  assigner?: Reference;
}

export interface CodeableConcept {
  coding?: Coding[];
  text?: string;
}

export interface Coding {
  system?: string;
  version?: string;
  code?: string;
  display?: string;
  userSelected?: boolean;
}

export interface Reference {
  reference?: string;
  type?: string;
  identifier?: Identifier;
  display?: string;
}

export interface Period {
  start?: string;
  end?: string;
}

export interface Quantity {
  value?: number;
  comparator?: '<' | '<=' | '>=' | '>';
  unit?: string;
  system?: string;
  code?: string;
}

export interface Range {
  low?: Quantity;
  high?: Quantity;
}

export interface Ratio {
  numerator?: Quantity;
  denominator?: Quantity;
}

export interface Meta {
  versionId?: string;
  lastUpdated?: string;
  source?: string;
  profile?: string[];
  security?: Coding[];
  tag?: Coding[];
}

// EMR-specific types
export interface EMRConfig {
  hospitalName: string;
  hospitalCode: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  timezone: string;
  currency: string;
  language: string;
  features: {
    billing: boolean;
    inventory: boolean;
    labIntegration: boolean;
    pharmacy: boolean;
    aiAssistant: boolean;
  };
}

export interface SystemSettings {
  id: string;
  category: string;
  key: string;
  value: string;
  description?: string;
  isActive: boolean;
  updatedBy: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Event types for real-time updates
export interface SystemEvent {
  id: string;
  type: string;
  resource: string;
  resourceId: string;
  userId: string;
  data?: Record<string, any>;
  timestamp: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}
