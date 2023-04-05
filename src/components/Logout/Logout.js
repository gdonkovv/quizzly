import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

export const Logout = () => {
    const { onLogout, token } = useAuthContext();

    useEffect(() => {
        onLogout(token);
    }, [onLogout, token]);

    return <Navigate to="/" />
};