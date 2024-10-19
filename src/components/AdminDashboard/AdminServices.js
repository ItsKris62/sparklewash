// src/components/AdminDashboard/Services.js

import { useState } from "react";
import Button from "../ui/Button"; // Update import directly
import Table from "../ui/Table"; // Update import directly
import Badge from "../ui/Badge"; // Update import directly

const servicesData = [
  { name: "Laundry Cleaning", status: "Active" },
  { name: "Dry Cleaning", status: "Active" },
  { name: "Ironing", status: "Active" },
  { name: "Airbnb Cleaning", status: "Active" },
  { name: "Meal Prep", status: "Active" },
  { name: "Carpet Cleaning", status: "Active" },
];

const AdminServices = () => {
  const [services, setServices] = useState(servicesData);

  return (
    <div>
      <h2 className="text-2xl">Services</h2>
      <Button className="mt-4">Add New Service</Button>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.name}</td>
              <td>
                <Badge variant={service.status === "Active" ? "outline" : "secondary"}>
                  {service.status}
                </Badge>
              </td>
              <td>
                <Button size="sm">Edit</Button>
                <Button size="sm" variant="danger" className="ml-2">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminServices;