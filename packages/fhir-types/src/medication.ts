/**
 * FHIR Medication and MedicationRequest Resource Type Definitions
 * Based on FHIR R4 specification
 */

export interface Medication {
  id: string;
  identifier?: Identifier[];
  code?: CodeableConcept;
  status?: 'active' | 'inactive' | 'entered-in-error';
  manufacturer?: Reference;
  form?: CodeableConcept;
  amount?: Ratio;
  ingredient?: MedicationIngredient[];
  batch?: MedicationBatch;
  meta?: Meta;
}

export interface MedicationIngredient {
  itemCodeableConcept?: CodeableConcept;
  itemReference?: Reference;
  isActive?: boolean;
  strength?: Ratio;
}

export interface MedicationBatch {
  lotNumber?: string;
  expirationDate?: string;
}

export interface MedicationRequest {
  id: string;
  identifier?: Identifier[];
  status: 'active' | 'on-hold' | 'cancelled' | 'completed' | 'entered-in-error' | 'stopped' | 'draft' | 'unknown';
  statusReason?: CodeableConcept;
  intent: 'proposal' | 'plan' | 'order' | 'original-order' | 'reflex-order' | 'filler-order' | 'instance-order' | 'option';
  category?: CodeableConcept[];
  priority?: 'routine' | 'urgent' | 'asap' | 'stat';
  doNotPerform?: boolean;
  reportedBoolean?: boolean;
  reportedReference?: Reference;
  medicationCodeableConcept?: CodeableConcept;
  medicationReference?: Reference;
  subject: Reference;
  encounter?: Reference;
  supportingInformation?: Reference[];
  authoredOn?: string;
  requester?: Reference;
  performer?: Reference;
  performerType?: CodeableConcept;
  recorder?: Reference;
  reasonCode?: CodeableConcept[];
  reasonReference?: Reference[];
  instantiatesCanonical?: string[];
  instantiatesUri?: string[];
  basedOn?: Reference[];
  groupIdentifier?: Identifier;
  courseOfTherapyType?: CodeableConcept;
  insurance?: Reference[];
  note?: Annotation[];
  dosageInstruction?: Dosage[];
  dispenseRequest?: MedicationRequestDispenseRequest;
  substitution?: MedicationRequestSubstitution;
  priorPrescription?: Reference;
  detectedIssue?: Reference[];
  eventHistory?: Reference[];
  meta?: Meta;
}

export interface Dosage {
  sequence?: number;
  text?: string;
  additionalInstruction?: CodeableConcept[];
  patientInstruction?: string;
  timing?: Timing;
  asNeededBoolean?: boolean;
  asNeededCodeableConcept?: CodeableConcept;
  site?: CodeableConcept;
  route?: CodeableConcept;
  method?: CodeableConcept;
  doseAndRate?: DosageDoseAndRate[];
  maxDosePerPeriod?: Ratio;
  maxDosePerAdministration?: Quantity;
  maxDosePerLifetime?: Quantity;
}

export interface DosageDoseAndRate {
  type?: CodeableConcept;
  doseRange?: Range;
  doseQuantity?: Quantity;
  rateRatio?: Ratio;
  rateRange?: Range;
  rateQuantity?: Quantity;
}

export interface Timing {
  event?: string[];
  repeat?: TimingRepeat;
  code?: CodeableConcept;
}

export interface TimingRepeat {
  boundsDuration?: Duration;
  boundsRange?: Range;
  boundsPeriod?: Period;
  count?: number;
  countMax?: number;
  duration?: number;
  durationMax?: number;
  durationUnit?: 'h' | 'd' | 'wk' | 'mo' | 'a';
  frequency?: number;
  frequencyMax?: number;
  period?: number;
  periodMax?: number;
  periodUnit?: 'h' | 'd' | 'wk' | 'mo' | 'a';
  dayOfWeek?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  timeOfDay?: string[];
  when?: ('MORN' | 'MORN.early' | 'MORN.late' | 'NOON' | 'AFT' | 'AFT.early' | 'AFT.late' | 'EVE' | 'EVE.early' | 'EVE.late' | 'NIGHT' | 'PHS' | 'HS' | 'WAKE' | 'C' | 'CM' | 'CD' | 'CV' | 'AC' | 'ACM' | 'ACD' | 'ACV' | 'PC' | 'PCM' | 'PCD' | 'PCV')[];
  offset?: number;
}

export interface Duration {
  value?: number;
  comparator?: '<' | '<=' | '>=' | '>';
  unit?: string;
  system?: string;
  code?: string;
}

export interface MedicationRequestDispenseRequest {
  initialFill?: MedicationRequestDispenseRequestInitialFill;
  dispenseInterval?: Duration;
  validityPeriod?: Period;
  numberOfRepeatsAllowed?: number;
  quantity?: Quantity;
  expectedSupplyDuration?: Duration;
  performer?: Reference;
}

export interface MedicationRequestDispenseRequestInitialFill {
  quantity?: Quantity;
  duration?: Duration;
}

export interface MedicationRequestSubstitution {
  allowedBoolean?: boolean;
  allowedCodeableConcept?: CodeableConcept;
  reason?: CodeableConcept;
}

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

export interface Range {
  low?: Quantity;
  high?: Quantity;
}

export interface Quantity {
  value?: number;
  comparator?: '<' | '<=' | '>=' | '>';
  unit?: string;
  system?: string;
  code?: string;
}

export interface Ratio {
  numerator?: Quantity;
  denominator?: Quantity;
}

export interface Annotation {
  authorReference?: Reference;
  authorString?: string;
  time?: string;
  text: string;
}

export interface Meta {
  versionId?: string;
  lastUpdated?: string;
  source?: string;
  profile?: string[];
  security?: Coding[];
  tag?: Coding[];
}

// EMR-specific medication database
export interface MedicineDatabase {
  id: string;
  name: string;
  genericName?: string;
  brandName?: string;
  strength?: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'drops' | 'inhaler' | 'suppository';
  route: 'oral' | 'intravenous' | 'intramuscular' | 'subcutaneous' | 'topical' | 'inhalation' | 'rectal' | 'vaginal';
  category: string;
  therapeuticClass: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  interactions: string[];
  dosage: {
    adult: string;
    pediatric?: string;
    geriatric?: string;
    renal?: string;
    hepatic?: string;
  };
  precautions: string[];
  pregnancyCategory?: 'A' | 'B' | 'C' | 'D' | 'X';
  breastfeeding?: 'safe' | 'caution' | 'avoid';
  storage: string;
  manufacturer: string;
  price?: {
    unit: number;
    currency: string;
  };
  availability: 'available' | 'limited' | 'unavailable';
  lastUpdated: string;
}

// Prescription interface
export interface Prescription {
  id: string;
  patientId: string;
  prescriberId: string;
  datePrescribed: string;
  medications: PrescriptionMedication[];
  diagnosis: string[];
  instructions: string;
  duration: string;
  refills?: number;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  pharmacy?: string;
  notes?: string;
  followUpDate?: string;
}
