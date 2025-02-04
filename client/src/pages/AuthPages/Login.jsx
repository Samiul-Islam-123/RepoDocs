import { SignIn } from '@clerk/clerk-react';
import SaveUserData from '../../utils/SaveUserdata';

function Login() {

  return (
    <>
    <div style={{
      display: 'flex',
      justifyContent : "center",
      alignItems: "center",
      height : "100vh"
    }}>
    <SignIn
      path="/login"
      routing="path"
      signUpUrl="/signup" // Redirects to your /signup route
      fallbackRedirectUrl="/dashboard" // Optional: where to go after successful login
      />
    </div>
      </>
  );
}

export default Login;
