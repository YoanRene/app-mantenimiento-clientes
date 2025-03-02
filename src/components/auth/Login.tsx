// src/components/auth/Login.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Alert, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const API_BASE_URL = config.API_BASE_URL;

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            setUsername(savedUsername);
            setRememberMe(true);
        }
    }, []);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/Authenticate/login`, {
                username,
                password,
            });

            const { token, userid } = response.data;

            // Store token and user ID securely (localStorage is for demo only)
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userid);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', username);
            
            console.log("localStorage after login:", localStorage);

            if (rememberMe) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }


            navigate('/'); // Redirect to home page
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors (e.g., network issues, 401 Unauthorized)
                if (error.response) {
                    setError(`Login failed: ${error.response.status} - ${error.response.data}`);
                } else {
                    setError('Login failed: Network error');
                }
            } else {
                // Handle other types of errors
                setError('Login failed: An unexpected error occurred.');
            }
             console.error("Login Error:", error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Remember Me"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
                <Typography align="center" sx={{ mt: 2 }}>
                    Don't have an account? <a href="/register">Register</a>
                </Typography>
            </form>
        </Container>
    );
};

export default Login;