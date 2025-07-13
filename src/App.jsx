import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { Navbar, Footer } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import LandingPage from "./pages/LandingPage";
import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import Contactus from "./pages/Contactus";
import Aboutus from "./pages/Aboutus";
import Page404 from "./pages/Page404";
import AdminPages from "./pages/AdminPages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div id="root" className="app-container">
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/contact" element={<Contactus />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/admin/*" element={<AdminPages />} />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
