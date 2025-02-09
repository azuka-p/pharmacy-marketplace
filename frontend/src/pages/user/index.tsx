import LoadingScreen from "@/components/reusables/loadingScreen";

export const userRoutes = [
  {
    path: "",
    lazy: async () => {
      const Homepage = await import("./homepage/homepage");
      return { Component: Homepage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "user/catalogs",
    lazy: async () => {
      const ProductByCatagoryPage = await import(
        "./productByCategory/productByCategory"
      );
      return { Component: ProductByCatagoryPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "categories",
    lazy: async () => {
      const ProductCategoryPage = await import(
        "./categories/productCategories"
      );
      return { Component: ProductCategoryPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "user/catalogs/:id",
    lazy: async () => {
      const ProductPage = await import("./product/product");
      return { Component: ProductPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
];

export const NonVerifiedRoutes = [
  {
    path: "profile",
    lazy: async () => {
      const ProfilePage = await import("./profile/profile");
      return { Component: ProfilePage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "address",
    lazy: async () => {
      const AddressPage = await import("./address/address");
      return { Component: AddressPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "verify",
    lazy: async () => {
      const VerifyAccountPage = await import("./verifyAccount/verifyAccount");
      return { Component: VerifyAccountPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
];

export const VerifiedRoutes = [
  {
    path: "cart",
    lazy: async () => {
      const CartPage = await import("./cart/cart");
      return { Component: CartPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "checkout",
    lazy: async () => {
      const CheckoutPage = await import("./checkout/checkout");
      return { Component: CheckoutPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "order-history",
    lazy: async () => {
      const OrderHistoryPage = await import("./order-history/orderHistory");
      return { Component: OrderHistoryPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
];
