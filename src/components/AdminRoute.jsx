import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
//redux has some problem, its oppoite to admin 

export default function AdminRoute({ children }) {
    const { user, status } = useSelector((state) => state.auth);

    if (!status) return <Navigate to="/login" />;

    if (user?.role === "admin") {
        return (
            <div className="text-center p-10 text-red-600 text-2xl font-bold">
                ❌ Access Denied — Admins Only
            </div>
        );
    }

    return children;
}
