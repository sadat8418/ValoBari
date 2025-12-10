import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({
    children,
    authentication = true,
    adminOnly = false
}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state) => state.auth.status); //auth goto authSlice
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        // 1️⃣ Not logged in but route requires login
        if (authentication && !authStatus) {
            navigate("/login");
            return;
        }

        // 2️⃣ Logged in but route is public (login/signup)
        if (!authentication && authStatus) {
            navigate("/");
            return;
        }

        // 3️⃣ Admin-only route but user is NOT admin
        // if (adminOnly && user?.role !== "admin") {
        //     navigate("/"); // or show a page
        //     return;
        // }

        setLoading(false);
    }, [authStatus, user, navigate, authentication, adminOnly]);

    return loading ? <h1>Loading...</h1> : <>{children}</>;
}
