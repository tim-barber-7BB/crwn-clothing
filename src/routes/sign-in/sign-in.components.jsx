import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up/sign-up.component";

const SignIn = () => {
  useEffect(() => {
    const stuff = async () => {
      const response = await getRedirectResult(auth);
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
      };
    stuff();
  }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log(user);
  }

  return (
    <div>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <button onClick={logGoogleRedirectUser}>Sign in with Google Redirect</button>
      <SignUpForm></SignUpForm>
    </div>
  )
}

export default SignIn;