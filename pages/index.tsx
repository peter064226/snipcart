import {
  Box,
  Button,
  Container,
  Flex,
  useColorMode,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import CartDrawer from "../src/components/CartDrawer";
import type { ProductInfoProps } from "../src/components/ProductInfo";
import ProductInfo from "../src/components/ProductInfo";

const Products: ProductInfoProps[] = [
  {
    id: 1,
    name: "Starry Night",
    desc: ` High-quality replica of The Starry Night by the Dutch
    post-impressionist painter Vincent van Gogh.`,
    inventory: 3,
    price: 79.5,
    photo: "https://demo.snipcart.com/images/starry-night.jpg",
    quantity: 0,
  },
  {
    id: 2,
    name: "Rosy-Fingered Dawn at Louse Point",
    desc: `The title Rosy-Fingered Dawn at Louse Point refers to one of Willem de Kooning's favourite places in Long Island.`,
    inventory: 8,
    price: 49.25,
    photo: "https://demo.snipcart.com/images/rosy.jpg",
    quantity: 0,
  },
];

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const disclosure = useDisclosure();
  const { onOpen } = disclosure;
  const [cart, setCart] = useState<ProductInfoProps[]>([]);
  const toast = useToast();

  const updateQuantity = (id: number, quantity: number) => {
    setCart([
      ...cart.map((product) => {
        if (product.id === id) {
          if (quantity > product.inventory) {
            toast({
              title: `insufficient inventory`,
              status: "error",
              isClosable: true,
            });
            return product;
          } else {
            return { ...product, quantity };
          }
        } else {
          return product;
        }
      }),
    ]);
  };

  const addProduct = (product: ProductInfoProps) => {
    const currentProduct = cart.find((prod) => prod.id === product.id);
    if (currentProduct) {
      updateQuantity(
        currentProduct.id,
        currentProduct.quantity + product.quantity
      );
    } else {
      setCart([...cart, { ...product }]);
    }
  };

  const removeProduct = (product: ProductInfoProps) => {
    setCart([...cart.filter((prod) => prod.id != product.id)]);
  };

  return (
    <Container maxW="container.lg">
      <Flex justifyContent="flex-end" py={5}>
        <header>
          <Button
            onClick={toggleColorMode}
            borderRight="1px solid"
            borderRightColor="brand.400"
          >
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Button onClick={onOpen}>Cart</Button>
        </header>
      </Flex>
      <VStack spacing={10}>
        {Products.map((product) => (
          <ProductInfo
            key={product.id}
            {...product}
            onOpen={onOpen}
            addProduct={addProduct}
          />
        ))}
      </VStack>
      <CartDrawer
        {...disclosure}
        cart={cart}
        updateQuantity={updateQuantity}
        removeProduct={removeProduct}
      />
      <Box h="500" />
    </Container>
  );
};

export default Home;
