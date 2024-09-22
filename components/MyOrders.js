import { useEffect, useState } from "react";

const MyOrders = ({ email }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/my-orders?email=${email}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchOrders();
        }
    }, [email]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id}>
                            <p><strong>Name:</strong> {order.name}</p>
                            <p><strong>City:</strong> {order.city}</p>
                            <p><strong>Postal Code:</strong> {order.postalCode}</p>
                            <p><strong>Address:</strong> {order.streetAddress}, {order.country}</p>
                            <p><strong>Paid:</strong> {order.paid ? "Yes" : "No"}</p>
                            <p><strong>Products:</strong></p>
                            <ul>
                                {order.line_items.map((item, index) => (
                                    <li key={index}>
                                        {item.price_data?.product_data.name} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyOrders;
