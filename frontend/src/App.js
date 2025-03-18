import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Exhibitions from "./pages/Exhibitions";
import Awards from "./pages/Awards";
import Patron from "./pages/Patron";
import About from "./pages/About";
import Press from "./pages/Press";
import Testimonials from "./pages/Testimonials";
import Studio from "./pages/Studio";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminArtworks from "./pages/admin/Artworks";
import AdminExhibitions from "./pages/admin/Exhibitions";
import PrivateRoute from "./components/routing/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Shipping from "./pages/Shipping";
import AuthenticityGuarantee from "./pages/AuthenticityGuarantee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3e50",
    },
    secondary: {
      main: "#e74c3c",
    },
    background: {
      default: "#f5f6fa",
    },
  },
  typography: {
    fontFamily: '"Times New Roman", serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      fontFamily: '"Times New Roman", serif',
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      fontFamily: '"Times New Roman", serif',
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      fontFamily: '"Times New Roman", serif',
    },
    h4: {
      fontFamily: '"Times New Roman", serif',
    },
    h5: {
      fontFamily: '"Times New Roman", serif',
    },
    h6: {
      fontFamily: '"Times New Roman", serif',
    },
    body1: {
      fontFamily: '"Times New Roman", serif',
    },
    body2: {
      fontFamily: '"Times New Roman", serif',
    },
    button: {
      fontFamily: '"Times New Roman", serif',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/studio" element={<Studio />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/exhibitions" element={<Exhibitions />} />
                <Route path="/awards" element={<Awards />} />
                <Route path="/press" element={<Press />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/patron" element={<Patron />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route
                  path="/authenticity"
                  element={<AuthenticityGuarantee />}
                />
                <Route path="/admin/*" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer position="bottom-left" />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
