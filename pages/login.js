import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './LoginPage.module.css';  // Import the CSS Module

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push('/account');
        } else {
            const { message } = await res.json();
            setError(message);
        }
    };

    return (
        <form onSubmit={handleLogin} className={styles.form}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={styles.input}  // Apply the CSS class
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={styles.input}  // Apply the CSS class
                required
            />
            <button type="submit" className={styles.button}>Login</button>
            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
}
