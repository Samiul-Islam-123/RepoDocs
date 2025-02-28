import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth, ClerkProvider, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/AuthPages/Signup';
import Login from '../pages/AuthPages/Login';
import SaveUserData from './SaveUserdata';
import PricingPage from '../pages/PricingPage';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth(); // Check both authentication and loading state
  const {user} = useUser();
  

  useEffect(() => {
    if (user) {
      const emailVerified = user.emailAddresses.some(
        (email) => email.verification.status === "verified"
      );
  
      const userData = {
        username: user.fullName || user.username || "Anonymous",
        email: user.primaryEmailAddress?.emailAddress,
        isVerified: emailVerified,
        avatarURL: user.imageUrl || "",
      };
  
      console.log(userData);
      SaveUserData(userData);
    }
  }, [user]);
  

  if (!isLoaded) {
    // Show a loading indicator while Clerk determines the auth state
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected content if authenticated
}

function RoutesManager() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/signup/*" element={<Signup />} />
      <Route exact path="/login/*" element={<Login />} />
      <Route exact path="/pricing" element={<ProtectedRoute>
            <PricingPage />
          </ProtectedRoute>} />
      

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default RoutesManager;
