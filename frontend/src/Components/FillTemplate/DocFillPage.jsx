import { Flex } from "@chakra-ui/react";
import DocFillTemplate from "./DocFillTemplate";
import LivePreview from "./LivePreview/LivePreview";

const DocFillPage = () => {
    return (
        <>
            <Flex flexDir="row">
                <LivePreview />
                <DocFillTemplate />
            </Flex>
        </>
    );
};

export default DocFillPage;
