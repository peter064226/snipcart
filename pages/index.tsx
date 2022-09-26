import {
  Box,
  Button,
  Container,
  Flex,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import CartDrawer from "../src/components/CartDrawer";
import type { ProductInfoProps } from "../src/components/ProductInfo";
import ProductInfo from "../src/components/ProductInfo";

const Products: ProductInfoProps[] = [
  {
    id: 1,
    name: "Starry Night",
    desc: ` High-quality replica of The Starry Night by the Dutch
    post-impressionist painter Vincent van Gogh.`,
    inventory: 10,
    price: 79.95,
    photo: "https://demo.snipcart.com/images/starry-night.jpg",
  },
  {
    id: 2,
    name: "Rosy-Fingered Dawn at Louse Point",
    desc: `The title Rosy-Fingered Dawn at Louse Point refers to one of Willem de Kooning's favourite places in Long Island.`,
    inventory: 10,
    price: 49.95,
    photo: "https://demo.snipcart.com/images/rosy.jpg",
  },
];

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const disclosure = useDisclosure();
  const { onOpen } = disclosure;

  return (
    <Container maxW={"container.lg"}>
      <Flex justifyContent="flex-end" py={5}>
        <header>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </header>
      </Flex>
      <VStack spacing={10}>
        {Products.map((product) => (
          <ProductInfo key={product.id} {...product} onOpen={onOpen} />
        ))}
      </VStack>
      <CartDrawer {...disclosure} products={Products} />
      <Box h="500" />
    </Container>
  );
};

export default Home;
