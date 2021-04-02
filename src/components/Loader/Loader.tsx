import { Box, CircularProgress } from "@material-ui/core";

export const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      overflow="hidden"
      padding="2rem"
    >
      <CircularProgress />
    </Box>
  );
};
