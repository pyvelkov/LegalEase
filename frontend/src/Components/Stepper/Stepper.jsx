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

/**
 * Generates a generalized stepper component to mark the progress of templating a document
 *
 * @param {Object} steps {Object containing the different steps properties}
 * @return {*}
 */
const StepperT = ({ steps, activeStep, action }) => {
    return (
        <Box m={10}>
            <Stepper size="md" index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index} onClick={() => action(index)}>
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
