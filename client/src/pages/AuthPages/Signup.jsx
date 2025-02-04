import { SignUp } from '@clerk/clerk-react';

function Signup() {
  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>

        <SignUp
          path="/signup"
          routing="path"
          signInUrl="/login" // Redirects to your /login route
          afterSignUpUrl="/dashboard" // Optional: where to go after successful signup
        />
      </div>
    </>
  );
}

export default Signup;
