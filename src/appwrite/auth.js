export class AuthService {
    backendUrl = "http://localhost:5000";

    async createAccount({ name, email, password }) {
        const res = await fetch(`${this.backendUrl}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        return await res.json();
    }

    async login({ email, password }) {
        const res = await fetch(`${this.backendUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);   // ⭐ store admin role
        }

        return data;
    }

    async getCurrentUser() {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const res = await fetch(`${this.backendUrl}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return await res.json();
    }

    isAdmin() {
        return localStorage.getItem("role") === "admin";
    }

    async logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return true;
    }
}

const authService = new AuthService();
export default authService;
