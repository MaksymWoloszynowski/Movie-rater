import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../../keycloak";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let mounted = true;

    keycloak.init({
      onLoad: "login-required",
      checkLoginIframe: false,
    })
    .then((auth) => {
      if (!mounted) return;

      setIsLogin(auth);
      setToken(keycloak.token);
      setUsername(keycloak.tokenParsed?.preferred_username);
      setInitialized(true);
    })
    .catch((err) => {
      console.error("Keycloak init failed:", err);
      setInitialized(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        token,
        username,
        keycloak,
        initialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;