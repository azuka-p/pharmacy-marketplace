import LoadingScreen from "@/components/reusables/loadingScreen";

export const pharmacistRoutes = [
  {
    path: "",
    lazy: async () => {
      const dashboard = await import("./dashboard/dashboard");
      return { Component: dashboard.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "pharmacy",
    lazy: async () => {
      const PharmacyDetail = await import("./pharmacy/pharmacyDetail");
      return { Component: PharmacyDetail.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "catalogs",
    lazy: async () => {
      const ManageProductPage = await import("./product/manageProduct");
      return { Component: ManageProductPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "catalogs/:id",
    lazy: async () => {
      const ProductDetailPage = await import("./product/productDetail");
      return { Component: ProductDetailPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "catalogs/add",
    lazy: async () => {
      const AddProductPage = await import("./product/addProduct");
      return { Component: AddProductPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "orders",
    lazy: async () => {
      const ManageOrderPage = await import("./order/manageOrder");
      return { Component: ManageOrderPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "orders/:id",
    lazy: async () => {
      const OrderDetailPage = await import("./order/orderDetail");
      return { Component: OrderDetailPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "dashboard",
    lazy: async () => {
      const dashboardPage = await import("./dashboard/dashboard");
      return { Component: dashboardPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
];
