"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    // Evaluate authorization immediately
    const [isAuthorized] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem("isAdmin") === "true";
        }
        return false;
    });

    useEffect(() => {
        if (!isAuthorized) {
            router.replace('/admin-login');
        }
    }, [isAuthorized, router]);

    if (!isAuthorized) {
        return null;
    }

    return children;
}

export default ProtectedRoute;