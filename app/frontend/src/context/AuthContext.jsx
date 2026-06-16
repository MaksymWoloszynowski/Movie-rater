import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../../keycloak";
import api from "../api/api";

const AuthContext = createContext(null);

const isAdminToken = (tokenParsed) => {
  const realmRoles = tokenParsed?.realm_access?.roles || [];
  const resourceRoles = Object.values(tokenParsed?.resource_access || {})
    .flatMap((resource) => resource.roles || []);

  return [...new Set([...realmRoles, ...resourceRoles])].includes("admin");
};

export const AuthProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    let mounted = true;

    keycloak.init({
      onLoad: "login-required",
      checkLoginIframe: false,
    })
    .then(async (auth) => {
      if (!mounted) return;

      setIsLogin(auth);
      setToken(keycloak.token);
      setUsername(keycloak.tokenParsed?.preferred_username);
      setIsAdmin(isAdminToken(keycloak.tokenParsed));
      try {
        const res = await api.get("/users/me");
        
        setIsBanned(res.data.is_banned);
      } catch (err) {
        console.error("Failed to fetch profile for ban status", err);
      }

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
        isAdmin,
        keycloak,
          isBanned,
          initialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;