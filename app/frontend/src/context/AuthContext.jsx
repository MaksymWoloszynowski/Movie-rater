import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../../keycloak";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
     if (keycloak.didInitialize) { 
          return
        }

    keycloak.init({ onLoad: "login-required" }).then((auth) => {
      setIsLogin(auth);
      setToken(keycloak.token);
      setUsername(keycloak.tokenParsed?.preferred_username);
      setInitialized(true);
    });

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