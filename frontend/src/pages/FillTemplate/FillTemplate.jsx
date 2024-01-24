import StepperT from "../../Components/Stepper/Stepper";
import FileUpload from "./FileUpload";

const FillTemplate = () => {
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
        <>
            <StepperT steps={steps} />
            <FileUpload />
        </>
    );
};

export default FillTemplate;
