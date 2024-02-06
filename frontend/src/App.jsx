import "./App.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import AppEntry from "./Components/AppEntry";
import RootLayout from "./layouts/RootLayout";
import FillTemplate from "./pages/FillTemplate/FillTemplate";
import DocFillTemplate from "./Components/FillTemplate/DocFillTemplate";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<AppEntry />} />
            <Route path="fillTemplate" element={<FillTemplate />} />
            <Route path="fillTemplate/:UUID" element={<DocFillTemplate />} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
