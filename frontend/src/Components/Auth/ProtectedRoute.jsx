import { Outlet, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Forbidden403 from "./Forbidden403";

const ProtectedRoute = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return (
            <>
                <Forbidden403 />
                <Navigate
                    to={loginWithRedirect({
                        authorizationParams: {
                            redirect_uri: window.location.origin,
                        },
                    })}
                />
            </>
        );
    }
};

export default ProtectedRoute;
