import Typography from '@mui/material/Typography';

export const TaskDescription = ({ text, limit }) => {
  const safeText = text || '';
  const truncatedText = safeText.length > limit ? safeText.slice(0, limit) + '...' : safeText;
  return (
    <Typography variant="body2" sx={{ marginBottom: 1 }}>
      {truncatedText}
    </Typography>
  );
};