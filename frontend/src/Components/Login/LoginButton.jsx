import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({ Hstack }) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <Button
                variant="ghost"
                w={Hstack ? "" : "full"}
                onClick={() => {
                    loginWithRedirect();
                }}
            >
                Sign in
            </Button>
        )
    );
};

export default LoginButton;
