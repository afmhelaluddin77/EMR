import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
} from '@mui/icons-material';
import { VitalSigns } from '@emr/fhir-types';

export interface VitalsChartProps {
  vitals: VitalSigns;
  showTrends?: boolean;
  compact?: boolean;
}

const getVitalColor = (type: string, value: number): string => {
  switch (type) {
    case 'temperature':
      if (value < 35 || value > 38) return '#f44336';
      if (value < 36 || value > 37.5) return '#ff9800';
      return '#4caf50';
    case 'bloodPressure':
      if (value > 140) return '#f44336';
      if (value > 120) return '#ff9800';
      return '#4caf50';
    case 'heartRate':
      if (value < 60 || value > 100) return '#f44336';
      if (value < 70 || value > 90) return '#ff9800';
      return '#4caf50';
    case 'respiratoryRate':
      if (value < 12 || value > 20) return '#f44336';
      if (value < 14 || value > 18) return '#ff9800';
      return '#4caf50';
    case 'oxygenSaturation':
      if (value < 95) return '#f44336';
      if (value < 97) return '#ff9800';
      return '#4caf50';
    default:
      return '#757575';
  }
};

const getTrendIcon = (current: number, previous?: number) => {
  if (!previous) return <TrendingFlatIcon />;
  if (current > previous) return <TrendingUpIcon color="error" />;
  if (current < previous) return <TrendingDownIcon color="success" />;
  return <TrendingFlatIcon color="action" />;
};

const VitalItem: React.FC<{
  label: string;
  value: string;
  unit: string;
  color: string;
  trend?: React.ReactNode;
}> = ({ label, value, unit, color, trend }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 1,
      border: '1px solid #e0e0e0',
      borderRadius: 1,
      mb: 1,
    }}
  >
    <Box>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" sx={{ color }}>
          {value}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {unit}
        </Typography>
      </Box>
    </Box>
    {trend && <Box>{trend}</Box>}
  </Box>
);

export const VitalsChart: React.FC<VitalsChartProps> = ({
  vitals,
  showTrends = false,
  compact = false,
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Vital Signs
        </Typography>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          Recorded: {new Date(vitals.dateTime).toLocaleString()}
        </Typography>
        
        <Grid container spacing={compact ? 1 : 2} sx={{ mt: 1 }}>
          {vitals.temperature && (
            <Grid item xs={6} sm={4} md={3}>
              <VitalItem
                label="Temperature"
                value={vitals.temperature.value.toString()}
                unit={`°${vitals.temperature.unit}`}
                color={getVitalColor('temperature', vitals.temperature.value)}
                trend={showTrends ? getTrendIcon(vitals.temperature.value) : undefined}
              />
            </Grid>
          )}
          
          {vitals.bloodPressure && (
            <Grid item xs={6} sm={4} md={3}>
              <VitalItem
                label="Blood Pressure"
                value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`}
                unit={vitals.bloodPressure.unit}
                color={getVitalColor('bloodPressure', vitals.bloodPressure.systolic)}
                trend={showTrends ? getTrendIcon(vitals.bloodPressure.systolic) : undefined}
              />
            </Grid>
          )}
          
          {vitals.heartRate && (
            <Grid item xs={6} sm={4} md={3}>
              <VitalItem
                label="Heart Rate"
                value={vitals.heartRate.value.toString()}
                unit={vitals.heartRate.unit}
                color={getVitalColor('heartRate', vitals.heartRate.value)}
                trend={showTrends ? getTrendIcon(vitals.heartRate.value) : undefined}
              />
            </Grid>
          )}
          
          {vitals.respiratoryRate && (
            <Grid item xs={6} sm={4} md={3}>
              <VitalItem
                label="Respiratory Rate"
                value={vitals.respiratoryRate.value.toString()}
                unit={vitals.respiratoryRate.unit}
                color={getVitalColor('respiratoryRate', vitals.respiratoryRate.value)}
                trend={showTrends ? getTrendIcon(vitals.respiratoryRate.value) : undefined}
              />
            </Grid>
          )}
          
          {vitals.oxygenSaturation && (
            <Grid item xs={6} sm={4} md={3}>
              <VitalItem
                label="O₂ Saturation"
                value={vitals.oxygenSaturation.value.toString()}
                unit={vitals.oxygenSaturation.unit}
                color={getVitalColor('oxygenSaturation', vitals.oxygenSaturation.value)}
                trend={showTrends ? getTrendIcon(vitals.oxygenSaturation.value) : undefined}
              />
            </Grid>
          )}
          
          {vitals.height && (
            <Grid item xs={6} sm={4} md={3}>
              <VitalItem
                label="Height"
                value={vitals.height.value.toString()}
                unit={vitals.height.unit}
                color="#757575"
              />
            </Grid>
          )}
          
          {vitals.weight && (
            <Grid item xs={6} sm={4} md={3}>
              <VitalItem
                label="Weight"
                value={vitals.weight.value.toString()}
                unit={vitals.weight.unit}
                color="#757575"
              />
            </Grid>
          )}
          
          {vitals.bmi && (
            <Grid item xs={6} sm={4} md={3}>
              <VitalItem
                label="BMI"
                value={vitals.bmi.toFixed(1)}
                unit=""
                color={vitals.bmi < 18.5 || vitals.bmi > 25 ? '#ff9800' : '#4caf50'}
              />
            </Grid>
          )}
        </Grid>
        
        {vitals.notes && (
          <Box mt={2}>
            <Typography variant="caption" color="textSecondary">
              Notes: {vitals.notes}
            </Typography>
          </Box>
        )}
        
        <Box mt={1}>
          <Typography variant="caption" color="textSecondary">
            Recorded by: {vitals.recordedBy}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
