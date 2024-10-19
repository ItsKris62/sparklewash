import Sidebar from '../components/AdminDashboard/AdminSidebar';
import Navbar from '../components/AdminDashboard/AdminNavbar';
import Dashboard from '../components/AdminDashboard/Dashboard';
import AdminOrders from '../components/AdminDashboard/AdminOrders';
import AdminSettings from '../components/AdminDashboard/AdminSettings';
import AdminServices from '../components/AdminDashboard/AdminServices';
import { useLocation, Routes, Route } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4 overflow-auto"> {/* Added flex-1 and overflow-auto */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="admin-orders" element={<AdminOrders />} />
            <Route path="admin-settings" element={<AdminSettings />} />
            <Route path="admin-services" element={<AdminServices />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;