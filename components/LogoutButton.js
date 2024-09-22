import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c82333;
    }
`;

const LogoutButton = () => {
    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
        });

        if (response.ok) {
            console.log('Çıkış başarılı!');
            // Çıkış başarılı olduğunda yönlendirme yapabilirsin
        } else {
            console.error('Çıkış hatası');
        }
    };

    return <Button onClick={handleLogout}>Çıkış Yap</Button>;
};

export default LogoutButton;
