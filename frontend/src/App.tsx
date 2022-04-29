import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from "./pages/Home";
import Meal from "./pages/Meal";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ViewPostDemo from "./pages/ViewPostDemo";
import { CreateNewFolderSharp } from "@mui/icons-material";

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
      <Box height="100vh" display="flex" flexDirection="column">
        <BrowserRouter>
          <Header title="[placeholder]" hide_paths={["/register", "/login"]} />

          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/createpost"
              element={<CreatePost />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/viewpost/:id"
              element={<Meal />}
            />
            <Route
              path="/viewpostdemo"
              element={<ViewPostDemo />}
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider >
  );
}


export default App;
