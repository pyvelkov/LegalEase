import { useState } from "react";
import {
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    Box,
    StepIcon,
    StepNumber,
    StepTitle,
    StepDescription,
    StepSeparator,
} from "@chakra-ui/react";

const StepperT = ({ steps }) => {
    const [activeStep, setActiveStep] = useState({
        index: 1,
        count: steps.length,
    });

    return (
        <Box m={10}>
            <Stepper size="md" index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index} onClick={() => setActiveStep(index)}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                                _hover={{ cursor: "pointer" }}
                            />
                        </StepIndicator>

                        <Box flexShrink="1" _hover={{ cursor: "pointer" }}>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>
                                {step.description}
                            </StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default StepperT;
