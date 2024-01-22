import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Image,
    Divider,
    Stack,
    Text,
    Heading,
    Center,
    HStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DocumentCard = ({ docName, uploadDate, uuid }) => {
    return (
        <Card maxW="sm">
            <CardBody>
                <Image
                    src="/DocPlaceholder.png"
                    alt="Document"
                    borderRadius="xl"
                />
                <Center>
                    <Stack mt="6" spacing="3">
                        <Heading size="md">{docName}</Heading>
                        <Text>Date uploaded:</Text>
                        <Text>{uploadDate}</Text>
                    </Stack>
                </Center>
            </CardBody>
            <Divider />
            <Center>
                <CardFooter>
                    <HStack spacing="10">
                        <Button variant="solid" colorScheme="blue">
                            Fill In
                        </Button>
                        <Center>
                            <DeleteIcon
                                as="button"
                                color="red.500"
                                onClick={() => {
                                    console.log("delete");
                                }}
                            />
                        </Center>
                    </HStack>
                </CardFooter>
            </Center>
        </Card>
    );
};

export default DocumentCard;
