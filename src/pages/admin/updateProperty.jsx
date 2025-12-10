import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../../appwrite/auth";
import conf from "../../conf/conf";
export default function UpdateProperty() {
    const { id } = useParams();
    const [form, setForm] = useState(null);

    useEffect(() => {
        // Check admin
        authService.getCurrentUser().then((u) => {
            if (!u || u.role !== "admin") {
                alert("Access Denied");
                window.location.href = "/";
            }
        });

        // Load property
        fetch(`${conf.appwriteUrl}/properties/${id}`)
            .then(res => res.json())
            .then(res => {
                if (!res.success) return;

                const p = res.property;

                setForm({
                    category_id: p.category_id,
                    name: p.name,
                    slug: p.slug,
                    description: p.description,
                    location: p.location,
                    price: p.price,
                    bedrooms: p.bedrooms,
                    bathrooms: p.bathrooms,
                    amenities: p.amenities,   // TEXT field now
                    status: p.status
                });
            });

    }, [id]);

    if (!form) return <p className="text-center mt-10">Loading...</p>;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const res = await fetch(`${conf.appwriteUrl}/properties/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (data.success) {
            alert("Updated successfully!");
            window.location.href = "/";
        } else {
            alert("Error: " + data.error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Update Property</h1>

            <form onSubmit={handleUpdate} className="space-y-4">

                <input name="category_id" value={form.category_id} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="slug" value={form.slug} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="bedrooms" value={form.bedrooms} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="bathrooms" value={form.bathrooms} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="amenities" value={form.amenities} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded" />

                <button className="w-full p-3 bg-green-600 text-white rounded">
                    Update Property
                </button>
            </form>
        </div>
    );
}
