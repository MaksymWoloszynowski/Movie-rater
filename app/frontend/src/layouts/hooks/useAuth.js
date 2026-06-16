import { useContext, useDebugValue } from "react";
import AuthContext from "../../context/AuthContext.jsx";

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export default useAuth;