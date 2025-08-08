import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  LocalHospital as DoctorIcon,
  MedicalServices as NurseIcon,
  LocalPharmacy as PharmacistIcon,
  Science as LabIcon,
  Person as PatientIcon,
  Receipt as BillingIcon,
  Support as ReceptionistIcon,
} from '@mui/icons-material';
import { UserRole } from '@emr/fhir-types';

export interface RoleBadgeProps extends Omit<ChipProps, 'label'> {
  role: UserRole;
  showIcon?: boolean;
  size?: 'small' | 'medium';
}

const getRoleConfig = (role: UserRole) => {
  switch (role) {
    case 'super_admin':
      return {
        label: 'Super Admin',
        color: 'error' as const,
        icon: AdminIcon,
      };
    case 'admin':
      return {
        label: 'Admin',
        color: 'error' as const,
        icon: AdminIcon,
      };
    case 'doctor':
      return {
        label: 'Doctor',
        color: 'primary' as const,
        icon: DoctorIcon,
      };
    case 'nurse':
      return {
        label: 'Nurse',
        color: 'secondary' as const,
        icon: NurseIcon,
      };
    case 'pharmacist':
      return {
        label: 'Pharmacist',
        color: 'info' as const,
        icon: PharmacistIcon,
      };
    case 'lab_technician':
      return {
        label: 'Lab Tech',
        color: 'warning' as const,
        icon: LabIcon,
      };
    case 'receptionist':
      return {
        label: 'Receptionist',
        color: 'default' as const,
        icon: ReceptionistIcon,
      };
    case 'billing_admin':
      return {
        label: 'Billing',
        color: 'success' as const,
        icon: BillingIcon,
      };
    case 'patient':
      return {
        label: 'Patient',
        color: 'default' as const,
        icon: PatientIcon,
      };
    default:
      return {
        label: 'Unknown',
        color: 'default' as const,
        icon: PatientIcon,
      };
  }
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  showIcon = true,
  size = 'small',
  ...chipProps
}) => {
  const config = getRoleConfig(role);
  const IconComponent = config.icon;

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      icon={showIcon ? <IconComponent /> : undefined}
      variant="outlined"
      {...chipProps}
    />
  );
};
