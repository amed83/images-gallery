import { Box, Typography } from "@material-ui/core";
import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="10rem"
      flexDirection="column"
    >
      <Box>
        <Typography variant="h5">IMAGES GALLERY</Typography>
        <Typography>Scroll down to load more..</Typography>
      </Box>
      <Dashboard />
    </Box>
  );
}

export default App;
