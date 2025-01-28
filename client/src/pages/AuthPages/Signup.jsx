import { SignUp } from '@clerk/clerk-react';

function Signup() {
  return (
    <SignUp
      path="/signup"
      routing="path"
      signInUrl="/login" // Redirects to your /login route
      afterSignUpUrl="/dashboard" // Optional: where to go after successful signup
    />
  );
}

export default Signup;
