// src/components/AdminUsers.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuth(); // Use useAuth to get token from AuthContext

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [user.token]);

    // Update user status (toggle between Active and Inactive)
    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setUsers(users.map((u) => (u._id === id ? { ...u, status: newStatus } : u)));
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-200 text-left">
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Role</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-t">
                            <td className="py-2 px-4">{`${user.firstName} ${user.lastName}`}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">{user.role}</td>
                            <td className="py-2 px-4">{user.status}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() =>
                                        handleStatusChange(user._id, user.status === 'active' ? 'inactive' : 'active')
                                    }
                                    className="text-blue-500 hover:underline"
                                >
                                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
