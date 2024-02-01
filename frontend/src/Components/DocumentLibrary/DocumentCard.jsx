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
    IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const DocumentCard = ({ docName, uploadDate, uuid }) => {
    return (
        <Card maxW="sm" key={uuid}>
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
                            <IconButton
                                icon={<DeleteIcon color="red.500" />}
                                bg="transparent"
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
