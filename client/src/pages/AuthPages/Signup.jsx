import { SignUp } from '@clerk/clerk-react';

function Signup() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <SignUp 
        path="/signup"
        routing="path"
        signInUrl="/login"
        afterSignUpUrl="/dashboard" // Redirects after full verification
      />
    </div>
  );
}

export default Signup;
