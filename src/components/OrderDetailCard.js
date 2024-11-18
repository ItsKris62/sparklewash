import React, { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

const OrderDetailCard = ({ order }) => {
  const barcodeRef = useRef(null);

  // Generate the barcode when the component renders
  useEffect(() => {
    if (order && order._id && barcodeRef.current) {
      JsBarcode(barcodeRef.current, order._id, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: false, // Hide the text below the barcode
      });
    }
  }, [order]);

  if (!order) {
    return <div className="p-6 bg-gray-100 rounded-lg shadow-lg">Select an order to view its details.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border max-w-sm mx-auto font-mono">
      {/* Receipt Header */}
      <div className="text-center border-b border-dashed pb-4 mb-4">
        <h2 className="text-xl font-bold">Clean Slate Laundry Services</h2>
        <p className="text-sm text-gray-500">Order Receipt</p>
        <p className="text-gray-500">Order #{order._id}</p>
        <p className="text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Order Details */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Order Details</h4>
        <p>Service: {order.service || 'N/A'}</p>
        <p>Extras: {order.extras?.map(extra => extra.name).join(', ') || 'None'}</p>
        <div className="flex justify-between mt-2">
          <span>Subtotal:</span>
          <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>${order.shipping || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${order.tax?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t border-dashed mt-2 pt-2">
          <span>Total:</span>
          <span>${order.total?.toFixed(2) || '0.00'}</span>
        </div>
      </div>

      {/* Shipping and Billing Info */}
      <div className="mb-4 border-b border-dashed pb-4">
        <h4 className="font-semibold mb-2">Shipping Information</h4>
        <p>{order.shippingInfo?.name || 'N/A'}</p>
        <p>{order.shippingInfo?.address || 'N/A'}</p>
        <p>
          {order.shippingInfo?.city}, {order.shippingInfo?.state}, {order.shippingInfo?.zip || ''}
        </p>
      </div>
      <div className="mb-4 border-b border-dashed pb-4">
        <h4 className="font-semibold mb-2">Billing Information</h4>
        <p>{order.billingInfo?.name || 'N/A'}</p>
        <p>{order.billingInfo?.address || 'N/A'}</p>
        <p>
          {order.billingInfo?.city}, {order.billingInfo?.state}, {order.billingInfo?.zip || ''}
        </p>
      </div>

      {/* Payment Information */}
      <div className="mb-4 border-b border-dashed pb-4">
        <h4 className="font-semibold mb-2">Payment Information</h4>
        <p>Payment Method: {order.paymentMethod || 'N/A'}</p>
        <p>Transaction ID: {order.transactionReference || 'N/A'}</p>
      </div>

      {/* Barcode Section */}
      <div className="mt-6 text-center">
        <div className="inline-block border border-dashed p-2 rounded-md bg-gray-50">
          <canvas
            ref={barcodeRef}
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          ></canvas>
        </div>
        <p className="text-xs text-gray-500 mt-2">Order ID: {order._id}</p>
      </div>
    </div>
  );
};

export default OrderDetailCard;
