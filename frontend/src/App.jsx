import "./App.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import AppEntry from "./Components/AppEntry";
import RootLayout from "./layouts/RootLayout";
import FileUpload from "./pages/FileUpload";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<AppEntry />} />
            <Route path="upload" element={<FileUpload />} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
