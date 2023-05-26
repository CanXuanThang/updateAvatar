import { Box } from '@mui/material';

interface Props {
  margin?: string;
}

function Footer(props: Props) {
  const { margin } = props;
  return (
    <Box
      component="span"
      sx={{
        margin: 0,
        lineHeight: 1.5,
        fontSize: '12px',
        fontFamily: 'SVN-Sofia-Regular',
        fontWeight: 400,
        color: 'rgb(104, 112, 118)',
        padding: '32px',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: margin ? margin : '0',
      }}
    >
      Copyright © 2022. All Rights Reserved
    </Box>
  );
}

export default Footer;
