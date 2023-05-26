import { Box, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

interface Props {
  children: any;
  nameField: string;
  required?: string;
}

function ContainerField({ children, nameField, required }: Props) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        '&:first-of-type': { marginLeft: '0', marginTop: 0 },
        marginTop: '0 !important',
      }}
    >
      <Grid
        item
        xs={12}
        md={5}
        xl={4}
        sx={{
          paddingLeft: '0 !important',
          paddingTop: '0 !important',
          display: 'flex',
          alignItems: 'center',
          marginTop: '0 !important',
        }}
      >
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            fontFamily: 'SVN-Sofia-Regular',
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            fontSize: '16px',
          }}
        >
          <FormattedMessage id={nameField} />
          <Box component="span" sx={{ color: 'rgb(229, 72, 77)', margin: 0 }}>
            {required}
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={12} md={7} xl={8} sx={{ paddingLeft: '0 !important', paddingTop: '0 !important' }}>
        {children}
      </Grid>
    </Grid>
  );
}

export default ContainerField;
