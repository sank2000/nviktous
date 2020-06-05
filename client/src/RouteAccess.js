import axios from "axios";

const signin = async (user) => {
  let prms = new URLSearchParams(user);
  const result = await axios.post("/auth/login", prms);
  return result;
}

const signup = async (user) => {
  let prms = new URLSearchParams(user);
  const result = await axios.post("/auth/register", prms);
  return result;
}

const hasSigned = async () => {
  const result = await axios.get("/auth");
  return result;
}

const signout = async () => {
  const result = await axios.get("/auth/logout");
  return result;
}

const facebook = async () => {
  const result = await axios.get("/auth/facebook", { headers: { "Access-Control-Allow-Origin": "*" } });
  return result;
}

const google = async () => {
  const result = await axios.get("/auth/google");
  return result;
}


export {
  signin, signup, hasSigned, signout, facebook, google
}
