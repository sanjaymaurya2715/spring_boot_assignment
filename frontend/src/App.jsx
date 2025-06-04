import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/common/NavBar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}
