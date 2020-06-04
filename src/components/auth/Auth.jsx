let auth = true;

function getAuth() {
  return auth;
}

function signIn() {
  auth = true;
}

function signOut() {
  auth = false;
}

const Auth = { getAuth, signIn, signOut }

export default Auth;
