const OrderDetailCard = ({ order }) => {
  if (!order) {
    return <div className="p-6 bg-gray-100 rounded-lg shadow-lg">Select an order to view its details.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-2">Order #{order._id}</h3>
      <p className="text-gray-600 mb-4">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      
      <hr className="my-4" />

      <h4 className="text-lg font-semibold mb-2">Order Details</h4>
      <p>Service Name: {order.service || 'N/A'}</p>
      <p>Additional Services: {order.extras?.map(extra => extra.name).join(', ') || 'None'}</p>
      <p className="mt-2 font-bold">Subtotal: ${order.subtotal?.toFixed(2) || '0.00'}</p>
      <p>Shipping: ${order.shipping || 'N/A'}</p>
      <p>Tax: ${order.tax?.toFixed(2) || '0.00'}</p>
      <p className="mt-2 text-xl font-bold">Total: ${order.total?.toFixed(2) || '0.00'}</p>

      <hr className="my-4" />

      <div className="flex justify-between">
        <div>
          <h4 className="font-bold mb-2">Shipping Information</h4>
          <p>{order.shippingInfo?.name || 'N/A'}</p>
          <p>{order.shippingInfo?.address || 'N/A'}</p>
          <p>{order.shippingInfo?.city}, {order.shippingInfo?.state}, {order.shippingInfo?.zip || ''}</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Billing Information</h4>
          <p>{order.billingInfo?.name || 'N/A'}</p>
          <p>{order.billingInfo?.address || 'N/A'}</p>
          <p>{order.billingInfo?.city}, {order.billingInfo?.state}, {order.billingInfo?.zip || ''}</p>
        </div>
      </div>

      <hr className="my-4" />

      <h4 className="font-bold mb-2">Payment Information</h4>
      <p>Payment Method: {order.paymentMethod || 'N/A'}</p>
      <p>Transaction ID: {order.transactionReference || 'N/A'}</p>
    </div>
  );
};

export default OrderDetailCard;
