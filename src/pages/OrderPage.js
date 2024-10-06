import React, { useState } from 'react';
import SideNav from '../layouts/SideNav'; // Importing SideNav
import SearchBar from '../components/SearchBar';
import OrderCard from '../components/OrderCard';
import OrderList from '../components/OrderList';
import OrderDetailCard from '../components/OrderDetailCard';

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      invoiceNumber: 'INV12345',
      serviceType: 'Airbnb Cleaning',
      status: 'Completed',
      transactionType: 'Credit Card',
      transactionReference: 'TXN98765',
      date: '2024-10-04',
      amount: 150.75,
      additionalServices: ['Bed Sheets Cleaning', 'Carpet Cleaning'],
      subtotal: 130,
      shipping: 10,
      tax: 10.75,
      total: 150.75,
      shippingInfo: { name: 'John Doe', address: '123 Main St', city: 'Somewhere', state: 'NY', zip: '10001' },
      billingInfo: { name: 'John Doe', address: '123 Main St', city: 'Somewhere', state: 'NY', zip: '10001' },
      paymentInfo: { method: 'Visa', transactionId: 'TXN98765' }
    },
    {
      invoiceNumber: 'INV12346',
      serviceType: 'Landscaping Services',
      status: 'Pending',
      transactionType: 'M-Pesa',
      transactionReference: 'SJ123456ABC',
      date: '2024-10-06',
      amount: 350.75,
      additionalServices: ['Lawn Mawing', 'Weeds removal'],
      subtotal: 340,
      shipping: 0.0,
      tax: 10.75,
      total: 350.75,
      shippingInfo: { name: 'John Doe', address: '123 Main St', city: 'Somewhere', state: 'NY', zip: '10001' },
      billingInfo: { name: 'John Doe', address: '123 Main St', city: 'Somewhere', state: 'NY', zip: '10001' },
      paymentInfo: { method: 'MPESA', transactionId: 'SJ123456ABC' }
    },
    // Add more mock orders here
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Add search filtering logic here
  };

  const handleCreateNewOrder = () => {
    console.log('Create New Order');
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="flex min-h-screen">
      <SideNav userName="John Doe" /> {/* SideNav added here */}
      <div className="p-6 w-full">
        <SearchBar onSearch={handleSearch} />

        <div className="mb-8">
          <OrderCard onCreateNewOrder={handleCreateNewOrder} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderList orders={orders} onSelectOrder={handleSelectOrder} />
          </div>

          <div>
            <OrderDetailCard order={selectedOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
