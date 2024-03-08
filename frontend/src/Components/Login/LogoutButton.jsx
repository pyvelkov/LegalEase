import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = ({ Hstack }) => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <Button
                variant="ghost"
                w={Hstack ? "" : "full"}
                onClick={() => {
                    logout({
                        logoutParams: { returnTo: window.location.origin },
                    });
                }}
            >
                Sign out
            </Button>
        )
    );
};

export default LogoutButton;
