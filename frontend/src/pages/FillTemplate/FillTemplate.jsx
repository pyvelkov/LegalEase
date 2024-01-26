import StepperT from "../../Components/Stepper/Stepper";
import FileUpload from "./FileUpload";
import { getTest, postTest } from "../../util/API/fetchApi";
import { useEffect } from "react";

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
    // const testGet = async () => {
    //     const test = await getTest();
    //     console.log(test);
    //     return test;
    // };
    const testPost = async () => {
        const payload = { test: "from frontend" };
        const test = await postTest(payload);
        console.log(test);
        return test;
    };

    useEffect(() => {
        testPost();
    }, []);
    return (
        <>
            <StepperT steps={steps} />
            <FileUpload />
        </>
    );
};

export default FillTemplate;
