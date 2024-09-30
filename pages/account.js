import styled from "styled-components";
import { useState, useEffect } from "react";
import GoogleIcon from "@/components/icons/GoogleIcon";
import MyOrders from "@/components/MyOrders";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

// Styled components for AccountPage
const StyledAccountPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;  /* Use min-height instead of height */
  background-color: #f0f0f0;
`;

const PageContent = styled.div`
  flex: 1;  /* This allows the content to grow and push the footer down */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  background-color: #0d3d29;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0b3322;
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const GoogleButton = styled(Button)`
  background-color: #db4437;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  margin-top: 10px;
`;

const LogoutButton = styled(Button)`
  background-color: #f44336;
  margin-top: 20px;

  &:hover {
    background-color: #e53935;
  }
`;

const LoadingMessage = styled.p`
  color: #4caf50;
  font-size: 14px;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

export default function AccountPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user, setUser } = useAuth();

    useEffect(() => {
        if (user) {
            setWelcomeMessage(`Welcome back, ${user.email}!`);
        }
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const data = { email, password };

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        setLoading(false);

        if (response.ok) {
            setWelcomeMessage(`Welcome back, ${name || email}!`);
        } else {
            const { message } = await response.json();
            setError(message || "Login error");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const data = { name, email, password };

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        setLoading(false);

        if (response.ok) {
            await handleLogin(e); // Login after signup
        } else {
            const { message } = await response.json();
            setError(message || "Signup error");
        }
    };

    const handleLogout = async () => {
        const response = await fetch("/api/logout", {
            method: "POST",
        });

        if (response.ok) {
            setWelcomeMessage("");
        } else {
            setError("Logout error");
        }
    };

    return (
        <StyledAccountPage>
            <PageContent>
                {welcomeMessage ? (
                    <FormContainer>
                        <h2>{welcomeMessage}</h2>
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                        <MyOrders email={email} />
                        <Link href="/wishlist" passHref>
                            <Button style={{ marginTop: "20px" }}>Go to Wishlist</Button>
                        </Link>
                    </FormContainer>
                ) : (
                    <Form onSubmit={isLogin ? handleLogin : handleSignup}>
                        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {!isLogin && (
                            <Input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        )}
                        <Button type="submit" disabled={loading}>
                            {loading
                                ? isLogin
                                    ? "Logging in..."
                                    : "Signing up..."
                                : isLogin
                                    ? "Login"
                                    : "Sign Up"}
                        </Button>
                        <GoogleButton onClick={() => console.log("Google Login")}>
                            <GoogleIcon style={{ width: "20px", marginRight: "10px" }} />
                            Google Login
                        </GoogleButton>
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ marginTop: "10px", background: "none", border: "none", cursor: "pointer" }}
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                        </button>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        {loading && <LoadingMessage>Processing, please wait...</LoadingMessage>}
                    </Form>
                )}
            </PageContent>
        </StyledAccountPage>
    );
}
