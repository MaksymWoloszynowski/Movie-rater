import { useNavigate } from "react-router-dom";
import api from "../api/api";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();
   const navigate = useNavigate();

    const logout = async () => {
        setAuth(null);
        try {
            await api.post('/auth/logout');
            navigate('/')
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout
