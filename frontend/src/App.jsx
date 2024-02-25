import "./App.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import AppEntry from "./Components/AppEntry";
import RootLayout from "./layouts/RootLayout";
import DocFillTemplate from "./Components/FillTemplate/DocFillTemplate";
import FillTemplateLayout from "./layouts/FillTemplateLayout";
import FillTemplate from "./pages/FillTemplate/FillTemplate";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<AppEntry />} />
            <Route path="fillTemplate/" element={<FillTemplateLayout />}>
                <Route index element={<FillTemplate />} />
                <Route path=":UUID" element={<DocFillTemplate />} />
            </Route>
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
