import { Box } from 'components/Box';
import { Grid } from 'react-loader-spinner';

export const Loader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    position="fixed"
    top="0"
    left="0"
    width="100vw"
    height="100vh"
    bg="#0000005e"
  >
    <Grid
      height="160"
      width="160"
      radius="9"
      color="#61dafb"
      ariaLabel="three-dots-loading"
    />
  </Box>
);
