"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        fetch("/api/admin/session")
            .then((response) => response.json())
            .then(({ authenticated }) => {
                if (authenticated) setIsAuthorized(true);
                else router.replace("/admin-login");
            })
            .catch(() => router.replace("/admin-login"));
    }, [router]);

    if (isAuthorized !== true) {
        return null;
    }

    return children;
}

export default ProtectedRoute;