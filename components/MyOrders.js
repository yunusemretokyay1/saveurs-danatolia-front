import { useEffect, useState } from "react";
import styled from "styled-components"; // Import styled-components

const OrdersContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const OrderItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;

  &:last-child {
    border-bottom: none; // Remove the bottom border for the last item
  }
`;

const LoadingMessage = styled.p`
  color: #4caf50; // Green color for loading
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red; // Red color for errors
  font-size: 16px;
`;

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

    if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

    return (
        <OrdersContainer>
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <OrderItem key={order._id}>
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
                        </OrderItem>
                    ))}
                </ul>
            )}
        </OrdersContainer>
    );
};

export default MyOrders;
