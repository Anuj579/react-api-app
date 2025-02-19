import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Layout from "./pages/Layout";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<Details />} />
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  );
}

export default App;