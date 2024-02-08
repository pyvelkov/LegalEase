import { SimpleGrid, Heading, Box, Center } from "@chakra-ui/react";
import Trustee from "./Trustee";
const Trustees = () => {
    return (
        <>
            <Box bg="#edf3f8" _dark={{ bg: "gray.800" }}>
                <Center>
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                        letterSpacing="tight"
                        lineHeight="short"
                        fontWeight="extrabold"
                        color="gray.900"
                        _dark={{ color: "white" }}
                    >
                        Trusted by Thousands
                    </Heading>
                </Center>
            </Box>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 4 }}
                spacing={10}
                px={{ base: 4, lg: 16, xl: 24 }}
                py={20}
                mb={4}
                mx="auto"
                bg="#edf3f8"
                _dark={{ bg: "gray.800" }}
                shadow="xl"
            >
                <Trustee image="https://scontent.fybz1-1.fna.fbcdn.net/v/t39.8562-6/252294889_575082167077436_6034106545912333281_n.svg/meta-logo-primary_standardsize.svg?_nc_cat=1&ccb=1-7&_nc_sid=e280be&_nc_ohc=iBz9UA_3Q-EAX-HAulY&_nc_ht=scontent.fybz1-1.fna&oh=00_AfAvDzthyr8m9Gn3wPn8GHoAkucJN75Wlh3TJ5bqcB3cdw&oe=65C851B9" />
                <Trustee image="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" />
                <Trustee image="/logos/apple.png" />
                <Trustee image="/logos/amazon.png" />
            </SimpleGrid>
        </>
    );
};

export default Trustees;
