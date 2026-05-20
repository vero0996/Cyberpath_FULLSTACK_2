import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GamePage from "./pages/GamePage";
import SignUp from "./pages/SignUp";

function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn
    ? children
    : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <SignUp
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        {/* PROTECTED */}
        <Route
          path="/dashboard/:role"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard
                setIsLoggedIn={setIsLoggedIn}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/game"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <GamePage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;