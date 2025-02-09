export type pharmacyType = {
  id: number;
  name: string;
};

type userType = {
  id: number;
  name: string;
};

type addressType = {
  id: number;
  name: string;
};

export type orderStatusType = {
  id: number;
  name: string;
};

type logisticPartnerType = {
  id: number;
  name: string;
};

type paymentMethodType = {
  id: number;
  name: string;
};

export type orderItemType = {
  id: number;
  quantity: number;
  catalog_id: number;
  price: string;
  product_id: number;
  product_name: string;
  product_image: string;
};

export type adminOrderResponse = {
  id: number;
  status: orderStatusType;
  pharmacy: pharmacyType;
};

export type adminOrderDetailResponse = {
  id: number;
  user: userType;
  address: addressType;
  order_status: orderStatusType;
  logistic_partner: logisticPartnerType;
  payment_method: paymentMethodType;
  total_price_shipping: string;
  total_price_product: string;
  order_items: orderItemType[];
};
