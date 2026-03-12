import Order from "../models/order.model";
import User from "../models/usersSchema";
import { sendOrderMail } from "../services/nodeMailer.service";

export const createOrderService = async (orderData: any) => {

  // console.log(">>>>>>>ordersdata", orderData);

  const { userId, products, paymentId, status } = orderData;

  const formattedProducts = products.map((item: any) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    images: item.images || []
  }));

  const order = await Order.create({
    userId,
    products: formattedProducts,
    paymentId,
    status
  });

  // console.log("orders---->", order);

  try {

    const user = await User.findById(userId);

    if (user?.email) {

      await sendOrderMail(
        user.email,
        order._id.toString(),
        formattedProducts
      );

      console.log("Order email sent");

    }

  } catch (mailError) {

    console.error("Email failed but order created:", mailError);

  }

  return order;
};

export const getOrdersByUserService = async (userId: string) => {

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  return orders;
};