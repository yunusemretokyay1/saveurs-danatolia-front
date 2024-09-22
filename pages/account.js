import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useState } from "react";
import GoogleIcon from "@/components/icons/GoogleIcon";
import MyOrders from "@/components/MyOrders";

const StyledAccountPage = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #333;
  text-align: center;
`;

const InfoSection = styled.div`
  margin: 10px 0;
  text-align: center;
`;

const InfoItem = styled.p`
  color: #4caf50;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 8px;
  margin: 8px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 8px;
  margin-top: 10px;
  width: 100%;
  background-color: #0d3d29;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0b3322;
  }
`;

const GoogleButton = styled(Button)`
  background-color: #db4437;
  display: flex;
  align-items: center;
  width: 150px;   
  height: 40px;   
  border-radius: 5px; 
`;

const LogoutButton = styled.button`
  padding: 8px;
  margin-top: 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

const CenterContainer = styled(Center)`
  padding-top: 80px;
`;

export default function AccountPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [welcomeMessage, setWelcomeMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, password };

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setWelcomeMessage(`Welcome back, ${name || email}!`);
            console.log('Login successful!');
        } else {
            console.error('Login error');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const data = { name, email, password };

        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Signup successful!');
            await handleLogin(e);
        } else {
            console.error('Signup error');
        }
    };

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });

        if (response.ok) {
            setWelcomeMessage('');
            console.log('Logout successful!');
        } else {
            console.error('Logout error');
        }
    };

    return (
        <StyledAccountPage>
            <Header />
            <CenterContainer>
                {welcomeMessage ? (
                    <>
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                        <MyOrders email={email} />
                    </>
                ) : (
                    <>
                        <Title>{isLogin ? 'Login' : 'Sign Up'}</Title>
                        {welcomeMessage && (
                            <InfoSection>
                                <InfoItem>{welcomeMessage}</InfoItem>
                            </InfoSection>
                        )}
                        <Form onSubmit={isLogin ? handleLogin : handleSignup}>
                            {isLogin ? (
                                <>
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
                                    <Button type="submit">Login</Button>
                                    <GoogleButton type="button" onClick={() => console.log('Google Login')}>
                                        <GoogleIcon style={{ width: '10px', marginRight: '10px' }} />
                                        Google Login
                                    </GoogleButton>
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(false)}
                                        style={{ marginTop: '10px' }}
                                    >
                                        Don't have an account? Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
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
                                    <Button type="submit">Register</Button>
                                </>
                            )}
                        </Form>
                    </>
                )}
            </CenterContainer>
        </StyledAccountPage>
    );
}
