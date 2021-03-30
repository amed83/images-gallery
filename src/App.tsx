import { Box } from "@material-ui/core";
import "./App.css";
import { Dashboard } from "./Dashboard/Dashboard";

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="10rem"
    >
      <Dashboard />
    </Box>
  );
}

export default App;
