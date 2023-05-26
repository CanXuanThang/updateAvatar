import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  children: any;
  bool?: boolean;
}

function HeaderForm({ title, children, bool }: Props) {
  return (
    <Box sx={{ backgroundColor: '#fff', padding: '10px', marginBottom: '10px', borderRadius: '8px' }} hidden={bool}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: 'SVN-Sofia-Medium',
            fontWeight: 500,
            fontSize: '20px',
            margin: 0,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            fontFamily: 'SVN-Sofia-Medium',
            color: 'rgb(104, 112, 118)',
            display: 'flex',
            alignItems: 'center',
            margin: 0,
          }}
        >
          Required &nbsp;(
          <Box component="span" sx={{ fontSize: '16px', color: 'rgb(229, 72, 77)', margin: 0 }}>
            *
          </Box>
          )
        </Typography>
      </Box>
      <hr
        style={{
          margin: '10px 0',
          borderWidth: '0px 0px thin',
          borderColor: 'rgba(193, 200, 205, 0.24)',
          borderStyle: 'solid',
        }}
      />
      {children}
    </Box>
  );
}

export default HeaderForm;
