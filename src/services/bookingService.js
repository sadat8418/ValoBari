import conf from "../conf/conf";

const API = conf.appwriteUrl;

const bookingService = {
    create: async (property_id, total_amount) => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ property_id, total_amount })
        });

        return res.json();
    }
};

export default bookingService;
