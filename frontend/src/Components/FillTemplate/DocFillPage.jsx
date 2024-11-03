import { GridItem, SimpleGrid } from "@chakra-ui/react";
import DocFillTemplate from "./DocFillTemplate";
import LivePreview from "./LivePreview/LivePreview";

const DocFillPage = () => {
    return (
        <>
            <SimpleGrid
                display={{ base: "initial", md: "grid" }}
                columns={{ md: 2 }}
            >
                <GridItem mt={[5, null, 0]} colSpan={{ md: 1 }}>
                    <LivePreview />
                </GridItem>
                <GridItem mt={[5, null, 0]} colSpan={{ md: 1 }}>
                    <DocFillTemplate />
                </GridItem>
            </SimpleGrid>
        </>
    );
};

export default DocFillPage;
