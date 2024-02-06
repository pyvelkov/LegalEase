import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

/**
 * Creates a general layout for the entire application
 */
export default function RootLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
