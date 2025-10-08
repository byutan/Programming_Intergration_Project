import NavBar from "./components/NavBar";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import HomePage from "./components/HomePage";
import AuthProvider from "./contexts/AuthProvider"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <AuthProvider>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/homepage" element={<HomePage />} />
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App
