import "./App.css";
import theme from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { PokemonDeatil } from ".";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "pokemon/:pokemonName",
    element: <PokemonDeatil />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
