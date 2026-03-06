import Order from "../models/order.model";

export const createOrderService = async (orderData: any) => {

  console.log(">>>>>>>ordersdata", orderData);

  const { userId, products, paymentId, status } = orderData;

  // format products properly
  const formattedProducts = products.map((item: any) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    images: item.images || []
  }));

  console.log("formattedpro",formattedProducts);
  
  const order = await Order.create({
    userId,
    products: formattedProducts,
    paymentId,
    status
  });
  console.log("orders---->",order);
  

  return order;
};

export const getOrdersByUserService = async (userId: string) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return orders;
};