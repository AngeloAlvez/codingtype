import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Speed,
  Refresh,
  Close,
  Assessment,
  CheckCircle,
  Code,
} from '@mui/icons-material';
import { useTyping } from '../contexts/TypingContext';
import { useTypingLogic } from '../hooks/useTypingLogic';

interface StatCardProps {
  icon: React.ReactElement;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle, color = 'primary' }) => (
  <Card elevation={2} sx={{ height: '100%' }}>
    <CardContent sx={{ textAlign: 'center', p: 2 }}>
      <Box display="flex" justifyContent="center" mb={1}>
        {icon}
      </Box>
      <Typography variant="h4" fontWeight="bold" color={`${color}.main`} gutterBottom>
        {value}
      </Typography>
      <Typography variant="body1" fontWeight="bold" color="text.primary">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

interface DetailCardProps {
  title: string;
  correct: number;
  incorrect: number;
  total: number;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, correct, incorrect, total }) => (
  <Card elevation={1} sx={{ mb: 2 }}>
    <CardContent sx={{ p: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <Typography color="success.main" fontWeight="bold">
            ✓ {correct}
          </Typography>
          <Typography color="error.main" fontWeight="bold">
            ✗ {incorrect}
          </Typography>
        </Box>
        <Typography variant="body1" fontWeight="bold">
          Total: {total}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export const ResultsModal: React.FC = () => {
  const { state, calculateWPM, calculateAccuracy } = useTyping();
  const { closeResults, getNextCode } = useTypingLogic();

  return (
    <Dialog
      open={state.showResults}
      onClose={closeResults}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          🎯 Resultado do Teste
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        {/* Estatística Principal - WPM */}
        <Box mb={3}>
          <StatCard
            icon={<Speed />}
            title="Palavras por Minuto"
            value={calculateWPM()}
            subtitle="Velocidade de digitação"
            color="success"
          />
        </Box>

        {/* Estatísticas em Cards */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
          <Box flex="1" minWidth="150px">
            <StatCard
              icon={<Assessment />}
              title="Precisão"
              value={`${calculateAccuracy()}%`}
              color="info"
            />
          </Box>
          <Box flex="1" minWidth="150px">
            <StatCard
              icon={<Code />}
              title="Códigos"
              value={state.completedCodes}
              subtitle="Completados"
              color="secondary"
            />
          </Box>
          <Box flex="1" minWidth="150px">
            <StatCard
              icon={<CheckCircle />}
              title="Palavras"
              value={state.totalTypedWords}
              subtitle="Digitadas"
              color="primary"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Detalhes */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Detalhes do Desempenho
        </Typography>

        <DetailCard
          title="Palavras"
          correct={state.correctWords}
          incorrect={state.incorrectWords}
          total={state.totalTypedWords}
        />

        <DetailCard
          title="Caracteres"
          correct={state.correctCharacters}
          incorrect={state.incorrectCharacters}
          total={state.totalTypedCharacters}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={closeResults}
          variant="outlined"
          startIcon={<Close />}
          size="large"
          sx={{ flex: 1 }}
        >
          Tentar Novamente
        </Button>
        <Button
          onClick={getNextCode}
          variant="contained"
          startIcon={<Refresh />}
          size="large"
          sx={{ flex: 1 }}
        >
          Próximo Código
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultsModal;
