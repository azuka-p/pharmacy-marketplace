export interface CheckoutSummaryProps {
  totalPrice: number;
  shippingFee: number;
  onSubmit: () => void;
  isAllShippingFullfilled: boolean;
}

export interface ShippingCostRequest {
  pharmacy_id: number;
  address_id: number;
}
export interface ShippingCostResponse {
  costs: {
    id: number;
    name: string;
    cost: string;
  }[];
}

export interface CheckoutCardProps {
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
  address_id: number | undefined;
  onSelect: (cost: number, orderDetails: OrderPharmacyDetail[]) => void;
  orderPharmacyDetails: OrderPharmacyDetail[] | undefined;
}

export interface CheckoutOrderGroup {
  address_id: number;
  payment_method_id: 1;
  order_pharmacy_details: OrderPharmacyDetail[];
}

export interface OrderPharmacyDetail {
  pharmacy_id: number;
  logistic_partner_id: number;
}

export interface unavailableCheckoutCardProps {
  unavailableProducts: {
    quantity: number;
    product: {
      id: number;
      name: string;
      image: string;
    };
  }[];
}
