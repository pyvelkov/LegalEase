import { Outlet } from "react-router-dom";
import StepperT from "../Components/Stepper/Stepper";

const FillTemplateLayout = ({ activeStep, action }) => {
    // the steps will display the different step/components on each click
    const steps = [
        { title: "Upload Document", description: "Upload or select document" },
        { title: "Add Content", description: "Fill in fields" },
        {
            title: "Finalize",
            description: "Review and download",
        },
    ];
    return (
        <div>
            <StepperT steps={steps} activeStep={activeStep} action={action} />
            <Outlet />
        </div>
    );
};

export default FillTemplateLayout;
