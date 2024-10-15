import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store';
import { ReactNode } from 'react';
import { User } from '@/store/UserSlice';

const ProtectedRoute = ({ children, user }: { children: ReactNode, user: User | null }) => {
    // const user = useSelector((state: RootState) => state.user.currentUser)
    const loading = useSelector((state: RootState) => state.user.loading);

    if (loading && !user) {
        return (
            <div>Loading...</div>
        );
    } else {
        console.log("user is -> ", user, loading)
        return (!loading && user != null) ? children : <Navigate to="/auth/login" />;
    }

};

export default ProtectedRoute;