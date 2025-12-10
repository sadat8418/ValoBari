import React, { useState, useEffect } from "react";
import propertyService from "../../services/propertyService.js";
import authService from "../../appwrite/auth";

function AddProperty() {
    const [user, setUser] = useState(null);

    const [form, setForm] = useState({
        category_id: "",
        name: "",
        slug: "",
        description: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        amenities: "",
        status: "active"
    });

    useEffect(() => {
        async function loadUser() {
            const u = await authService.getCurrentUser();
            setUser(u);
        }
        loadUser();
    }, []);

    if (!user) return <div>Loading...</div>;
    if (user.role !== "admin") return <div className="text-center p-10 text-white-800 text-2xl font-bold">
                ❌ Access Denied — Admins Only
            </div>;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            category_id: Number(form.category_id),
            price: Number(form.price),
            bedrooms: Number(form.bedrooms),
            bathrooms: Number(form.bathrooms),
            amenities: form.amenities.split(",").map(a => a.trim())
        };

        try {
            await propertyService.createProperty(payload);
            alert("Property Created!");
            window.location.href = "/";
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 shadow bg-white rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Add Property</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input name="category_id" className="border p-2" placeholder="Category ID" onChange={handleChange} />
                <input name="name" className="border p-2" placeholder="Name" onChange={handleChange} />
                <input name="slug" className="border p-2" placeholder="Slug" onChange={handleChange} />
                <textarea name="description" className="border p-2" placeholder="Description" onChange={handleChange} />
                <input name="location" className="border p-2" placeholder="Location" onChange={handleChange} />
                <input type="number" name="price" className="border p-2" placeholder="Price" onChange={handleChange} />
                <input type="number" name="bedrooms" className="border p-2" placeholder="Bedrooms" onChange={handleChange} />
                <input type="number" name="bathrooms" className="border p-2" placeholder="Bathrooms" onChange={handleChange} />
                <input name="amenities" className="border p-2" placeholder="Amenities (comma separated)" onChange={handleChange} />

                <button className="bg-blue-600 text-white py-2 rounded">
                    Create Property
                </button>
            </form>
        </div>
    );
}

export default AddProperty;
