import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from "./pages/Home";
import Meal from "./pages/Meal";

function App() {

  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title="PlaceHolder" />
      <Box height="100vh" display="flex" flexDirection="column">
        <BrowserRouter>
          <Routes>
            <Route
              path="/meals/:id"
              // TODO: pass props
              element={<Meal />} 
            />

            <Route
              path="/"
              element={<Home />}
            />

          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}


export default App;
