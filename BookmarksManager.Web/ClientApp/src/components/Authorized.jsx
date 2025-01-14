import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function Authorized({ children }) {
    return useUser().user ? children : <Navigate to='/login' replace />;
}

