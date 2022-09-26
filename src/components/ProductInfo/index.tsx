import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

export type ProductInfoProps = {
  id: number;
  name: string;
  desc: string;
  inventory: number;
  price: number;
  photo: string;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  id,
  name,
  desc,
  inventory,
  price,
  photo,
}) => {
  return (
    <Flex
      w="full"
      direction={{ base: "column", md: id % 2 === 0 ? "row" : "row-reverse" }}
    >
      <VStack
        alignItems="flex-start"
        justifyContent="center"
        w={{ base: "full", md: "55%" }}
        spacing={5}
      >
        <Heading>{name}</Heading>
        <Text fontWeight="semibold">{desc}</Text>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          w="full"
          columnGap={3}
          rowGap={3}
        >
          <GridItem>
            <FormControl>
              <FormLabel fontSize={12}>QUANTITY</FormLabel>
              <NumberInput defaultValue={1} min={1} max={inventory}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel fontSize={12}>FORMAT</FormLabel>
              <Select placeholder="Select option">
                <option value="physical">Physical copy</option>
                <option value="digital">Digital copy (.jpeg)</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <Center
              alignItems={"center"}
              fontWeight="semibold"
              h="10"
              border="1px"
              borderColor="var(--chakra-colors-chakra-border-color)"
            >
              ${price}
            </Center>
          </GridItem>
          <GridItem>
            <Button w="full" fontWeight="200">
              ADD TO CART
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
      <Spacer />
      <Box w={{ base: "full", md: "40%" }} pt={{ base: 3, md: 0 }}>
        <Image src={photo} alt="naruto" objectFit="cover" />
      </Box>
    </Flex>
  );
};

export default ProductInfo;
