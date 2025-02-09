export interface cartCatalogResponse {
  available: CartGroupPharmacy[];
  unavailable: {
    quantity: number;
    product: {
      id: number;
      name: string;
      image: string;
    };
  }[];
}

export interface CartGroupPharmacy {
  pharmacy: {
    id: number;
    name: string;
    address: {
      name: string;
    };
    logistic_partners: {
      id: number;
      name: string;
    }[];
  };
  catalogs: {
    id: number;
    price: string;
    stock: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      image: string;
    };
  }[];
}

export interface CartRequest {
  product_id: number;
}

export interface CartResponse {
  id: number;
  quantity: number;
}

export interface CartItemsProps {
  id: number;
  stock: number;
  image: string;
  name: string;
  price: string;
  onDelete: () => void;
}

export interface CartCardProps {
  pharmacy: {
    id: number;
    name: string;
    address: {
      name: string;
    };
    logistic_partners: {
      id: number;
      name: string;
    }[];
  };
  catalogs: {
    id: number;
    price: string;
    stock: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      image: string;
    };
  }[];
  isLoading: boolean;
}
