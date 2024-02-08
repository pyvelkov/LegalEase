import { Box, Icon, Heading, Text, Center } from "@chakra-ui/react";

const Feature = (props) => {
    return (
        <Box>
            <Center>
                <Icon
                    boxSize={12}
                    _light={{ color: "brand.700" }}
                    mb={4}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    {props.icon}
                </Icon>
            </Center>
            <Center>
                <Heading
                    as="h3"
                    mb={3}
                    fontSize="lg"
                    lineHeight="shorter"
                    fontWeight="bold"
                    _light={{ color: "gray.900" }}
                >
                    {props.title}
                </Heading>
            </Center>
            <Center>
                <Text
                    as="p"
                    lineHeight="tall"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                >
                    {props.children}
                </Text>
            </Center>
        </Box>
    );
};

export default Feature;
