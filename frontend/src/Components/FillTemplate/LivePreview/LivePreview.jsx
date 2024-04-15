import { Flex, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const LivePreview = () => {
    const [navSize, setNavSize] = useState("large");
    return (
        <>
            <Flex
                pos="sticky"
                left="5"
                h="70vh"
                marginTop="2.5vh"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                w={navSize == "small" ? "75px" : "500px"}
                flexDir="column"
                justifyContent="space-between"
            >
                <Flex as="nav" p="5%" flexDir="column" alignItems="flex-start">
                    <IconButton
                        background="none"
                        mt={5}
                        _hover={{ background: "none" }}
                        icon={<FiMenu />}
                        onClick={() => {
                            if (navSize == "small") setNavSize("large");
                            else setNavSize("small");
                        }}
                    />
                </Flex>
                <Flex>{/* this is where the RTE will go */}</Flex>
            </Flex>
        </>
    );
};

export default LivePreview;
