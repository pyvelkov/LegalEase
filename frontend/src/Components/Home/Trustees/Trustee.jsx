import { Box, Center, Image } from "@chakra-ui/react";

const Trustee = (props) => {
    return (
        <Box>
            <Center>
                <Image
                    src={props.image}
                    alt="Company Logo"
                    rounded="lg"
                    width={{ base: "75px", lg: "100px" }}
                    height={{ base: "75px", lg: "100px" }}
                    my={{ base: 2, lg: 0 }}
                />
            </Center>
        </Box>
    );
};

export default Trustee;
