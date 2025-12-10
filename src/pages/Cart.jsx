import React, { useEffect, useState } from "react";
import conf from "../conf/conf.js";
const API = conf.appwriteUrl;

function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // Fetch all bookings for the logged-in user
    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await fetch(`${API}/bookings/my`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                console.log("Cart data:", data);

                if (data.success) {
                    setCart(data.bookings);
                }
            } catch (err) {
                console.error("CART FETCH ERROR:", err);
            }

            setLoading(false);
        }

        fetchCart();
    }, []);

    // Delete a cart item
    const deleteCart = async (id) => {
        if (!window.confirm("Remove this item from cart?")) return;

        try {
            const res = await fetch(`${API}/bookings/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (data.success) {
                setCart(cart.filter((item) => item.id !== id));
            } else {
                alert("Could not delete cart item");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (cart.length === 0) {
        return <div className="text-center p-10 text-xl font-semibold">Cart is empty.</div>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Cart</h1>

            <div className="space-y-4">
                {cart.map((item) => (
                    <div key={item.id} className="p-4 bg-white shadow-md rounded-xl border">
                        <h2 className="text-xl font-semibold">{item.property_name}</h2>
                        <p className="text-gray-600">Amount: ${item.total_amount}</p>
                        <p>Status: <span className="font-bold">{item.status}</span></p>
                        <p>Payment Status: <span className="font-bold">{item.payment_status}</span></p>

                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={() => deleteCart(item.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Remove
                            </button>

                            {item.payment_status === "initiated" && (
                                <a
                                    href={`/payments/${item.payment_id}`}
                                    className="px-3 py-1 bg-blue-600 text-white rounded"
                                >
                                    Complete Payment
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
