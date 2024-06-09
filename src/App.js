import React from "react";
import Chat from "./components/Chat";
import { CssBaseline, Container, Box } from "@mui/material";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Chat />
        </Box>
      </Container>
    </>
  );
};

export default App;
