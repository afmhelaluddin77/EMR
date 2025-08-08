import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

export interface MedicalCardProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  status?: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
  actions?: {
    edit?: () => void;
    delete?: () => void;
    view?: () => void;
  };
  children?: React.ReactNode;
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'default';
    case 'pending':
      return 'warning';
    case 'completed':
      return 'info';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'low':
      return 'success';
    case 'medium':
      return 'warning';
    case 'high':
      return 'error';
    case 'urgent':
      return 'error';
    default:
      return 'default';
  }
};

export const MedicalCard: React.FC<MedicalCardProps> = ({
  title,
  subtitle,
  content,
  status,
  priority,
  tags = [],
  actions,
  children,
}) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            {status && (
              <Chip
                label={status}
                color={getStatusColor(status) as any}
                size="small"
              />
            )}
            {priority && (
              <Chip
                label={priority}
                color={getPriorityColor(priority) as any}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        }
        subheader={subtitle}
        action={
          actions && (
            <Box>
              {actions.view && (
                <Tooltip title="View">
                  <IconButton size="small" onClick={actions.view}>
                    <ViewIcon />
                  </IconButton>
                </Tooltip>
              )}
              {actions.edit && (
                <Tooltip title="Edit">
                  <IconButton size="small" onClick={actions.edit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              {actions.delete && (
                <Tooltip title="Delete">
                  <IconButton size="small" onClick={actions.delete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )
        }
      />
      <CardContent>
        {tags.length > 0 && (
          <Box display="flex" gap={0.5} mb={2} flexWrap="wrap">
            {tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        )}
        <Box>{content}</Box>
        {children && <Box mt={2}>{children}</Box>}
      </CardContent>
    </Card>
  );
};
