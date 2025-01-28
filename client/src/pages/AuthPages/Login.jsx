import { SignIn } from '@clerk/clerk-react';
import SaveUserData from '../../utils/SaveUserdata';

function Login() {

  return (
    <SignIn
      path="/login"
      routing="path"
      signUpUrl="/signup" // Redirects to your /signup route
      fallbackRedirectUrl="/dashboard" // Optional: where to go after successful login
    />
  );
}

export default Login;
