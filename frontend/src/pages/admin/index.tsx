import LoadingScreen from "@/components/reusables/loadingScreen";

export const adminRoutes = [
  {
    path: "",
    lazy: async () => {
      const DashboardPage = await import("./dashboard/dashboard");
      return { Component: DashboardPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "users",
    lazy: async () => {
      const ManageUserPage = await import("./manageUsers");
      return { Component: ManageUserPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "pharmacists",
    lazy: async () => {
      const ManagePharmacistPage = await import(
        "./pharmacist/managePharmacist"
      );
      return { Component: ManagePharmacistPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "pharmacists/create",
    lazy: async () => {
      const CreatePharmacistPage = await import(
        "./pharmacist/createPharmacist"
      );
      return { Component: CreatePharmacistPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "pharmacists/:id",
    lazy: async () => {
      const PharmacistDetailPage = await import(
        "./pharmacist/pharmacistDetail"
      );
      return { Component: PharmacistDetailPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "products",
    lazy: async () => {
      const ManageProductPage = await import("./product/manageProduct");
      return { Component: ManageProductPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "products/create",
    lazy: async () => {
      const CreateProductPage = await import("./product/createProduct");
      return { Component: CreateProductPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "products/:id",
    lazy: async () => {
      const ProductDetailPage = await import("./product/productDetail");
      return { Component: ProductDetailPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "product-categories",
    lazy: async () => {
      const ProductCategoryPage = await import(
        "./category/manageProductCategory"
      );
      return { Component: ProductCategoryPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "product-categories/create",
    lazy: async () => {
      const CreateCategoryPage = await import("./category/createCategory");
      return { Component: CreateCategoryPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "product-categories/:id",
    lazy: async () => {
      const CategoryDetailPage = await import("./category/categoryDetail");
      return { Component: CategoryDetailPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "pharmacies",
    lazy: async () => {
      const ManagePharmacyPage = await import("./pharmacy/managePharmacy");
      return { Component: ManagePharmacyPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "pharmacies/create",
    lazy: async () => {
      const CreatePharmacyPage = await import("./pharmacy/createPharmacy");
      return { Component: CreatePharmacyPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "pharmacies/:id",
    lazy: async () => {
      const PharmacyDetailPage = await import("./pharmacy/pharmacyDetail");
      return { Component: PharmacyDetailPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "partners",
    lazy: async () => {
      const ManagePartnerPage = await import("./partner/managePartner");
      return { Component: ManagePartnerPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "partners/create",
    lazy: async () => {
      const CreatePartnerPage = await import("./partner/createPartner");
      return { Component: CreatePartnerPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "partners/:id",
    lazy: async () => {
      const PartnerDetailPage = await import("./partner/partnerDetail");
      return { Component: PartnerDetailPage.default };
    },
    hydrateFallbackElement: <LoadingScreen />,
  },
  {
    path: "dashboard",
    lazy: async () => {
      const AdminDashboardPage = await import("./dashboard/dashboard");
      return { Component: AdminDashboardPage.default };
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
];
