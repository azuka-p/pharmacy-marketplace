type userType = {
  id: number;
  name: string;
};

type addressType = {
  id: number;
  name: string;
};

type orderStatusType = {
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

export type pharmacistOrderResponse = {
  id: number;
  status: string;
  product_count: number;
  total_price_product: string;
};

export type pharmacistOrderDetailResponse = {
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
