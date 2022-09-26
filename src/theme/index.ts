import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const formItemStyle = {
  sizes: {
    md: {
      field: {
        borderRadius: "none",
      },
    },
  },
  variants: {
    outline: {
      field: {
        _focus: {
          borderColor: "brand.500",
        },
        _focusVisible: {
          borderColor: "none",
          boxShadow: "none",
          outline: "none",
        },
      },
    },
  },
};

const globalFontWeight = {
  fontWeight: "300 !important",
};

const myTheme = extendTheme(
  {
    colors: {
      brand: {
        50: "#f5fee5",
        100: "#e1fbb2",
        200: "#cdf781",
        300: "#b8ee56",
        400: "#a2e032",
        500: "#8ac919",
        600: "#71ab09",
        700: "#578602",
        800: "#3c5e00",
        900: "#203300",
      },
    },
    styles: {
      global: () => ({
        h2: globalFontWeight,
        div: globalFontWeight,
        label: globalFontWeight,
        input: globalFontWeight,
        select: globalFontWeight,
        option: globalFontWeight,
        a: globalFontWeight,
        button: globalFontWeight,
      }),
    },
    components: {
      NumberInput: formItemStyle,
      Select: formItemStyle,
      Button: {
        variants: {
          solid: (props: Record<string, any>) => ({
            rounded: "none",
            backgroundColor: mode("brand.500", "brand.400")(props),
            _hover: {
              backgroundColor: mode("brand.600", "brand.500")(props),
            },
          }),
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Button"],
  })
);

export default myTheme;
