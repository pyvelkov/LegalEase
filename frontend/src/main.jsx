import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme/theme";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./util/store/store";
import { Provider } from "react-redux";

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const clientID = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: `localhost:5000`,
                // scope: "read:current_user update:current_user_metadata",
            }}
        >
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <Provider store={store}>
                    <App />
                </Provider>
            </ChakraProvider>
        </Auth0Provider>
    </React.StrictMode>
);
