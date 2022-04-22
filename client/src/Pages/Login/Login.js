import SignIn from "../../Componenets/Sign-in/SignIn";
import Layout from "../../Componenets/Layout/Layout";
import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.js";

const Login = () => {
  const { auth } = useAuth();
  
  return (
    <>
      {auth?.username ? (
        <Navigate to="/" replace />
      ) : (
        <Layout>
          <SignIn />
        </Layout>
      )}
    </>
  );
};

export default Login;
