import React, { useEffect, useState } from "react";
import propertyService from "../services/propertyService.js";
import authService from "../appwrite/auth"
import Hero from "../hero/Hero.jsx";
import bookingService from "../services/bookingService.js";
function Home() {
    const [properties, setProperties] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function loadData() {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);

            if (currentUser) {
                const res = await propertyService.getAll();
                if (res.success) setProperties(res.properties);
            }
        } catch (err) {
            console.log("Auth error:", err);
        }

        setLoading(false);
    }

    loadData();
}, []);

console.log("Logged in user:", user);
console.log("Logged in user:", user?.role);
console.log("Redux User:", user);
console.log("User Role:", user?.role);
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this property?")) return;

        await propertyService.deleteProperty(id);
        setProperties(properties.filter((p) => p.id !== id));
    };

    // 🔹 While loading
    if (loading) {
        return <div className="text-center p-10 text-xl">Loading...</div>;
    }

    // 🔹 If NOT logged in → show HERO only
    if (!user) {
        return (
            <div className="text-center">
                <Hero />
            </div>
        );
    }

    // 🔹 Logged-in user but 0 properties
    if (properties.length === 0) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-semibold mt-10">
                    No properties found.
                </h2>
            </div>
        );
    }
const handleBuy = async (propertyId, price) => {
    console.log("Buying property:", propertyId, price);

    try {
        const res = await bookingService.create(propertyId, price);
        console.log("Booking response:", res);

        if (res?.success) {
            alert("Booking created!");
            window.location.href = "/";
        } else {
            alert("Error: " + (res?.error || "Unknown error"));
        }
    } catch (err) {
        console.error("Buy error:", err);
        alert("Something went wrong.");
    }
};


    // 🔹 Logged-in user → show properties
    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {properties.map((p) => (
                <div key={p.id} className="p-4 bg-white shadow rounded-xl">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <p className="text-gray-600">{p.location}</p>
                    <p className="text-gray-700 font-semibold">${p.price}</p>
                    <p className="text-sm">Category: {p.category_name}</p>
        <button
    onClick={() => handleBuy(p.id, p.price)}

    className="px-3 py-1 text-sm bg-green-600 text-white rounded"
>
    Add to Cart
</button>

                    {user?.role === "admin" && (
                        <div className="flex gap-2 mt-3">
                            <a
                                href={`/update-property/${p.id}`}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                            >
                                Edit
                            </a>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    )}

         

                </div>
            ))}
        </div>
    );
}

export default Home;
