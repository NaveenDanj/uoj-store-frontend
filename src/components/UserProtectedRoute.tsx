import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store';
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const user = useSelector((state: RootState) => state.user.currentUser)
    return user ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;