// src/components/AdminDashboard/Settings.js

import { useState } from "react";
import Button from "../ui/Button"; 
import Card from "../ui/Card"; 
import CardHeader from "../ui/CardHeader"; 
import CardContent from "../ui/CardContent"; 
import CardTitle from "../ui/CardTitle"; 
import CardDescription from "../ui/CardDescription";

const AdminSettings = () => {
  const [storeName, setStoreName] = useState("My Awesome Store");
  const [pluginsDirectory, setPluginsDirectory] = useState("/content/plugins");
  const [allowAdminChange, setAllowAdminChange] = useState(true);

  const handleSave = () => {
    // Here you would typically handle saving the settings
    alert("Settings Saved!");
  };

  return (
    <div>
      <h2 className="text-2xl">Settings</h2>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Store Name</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </CardContent>
      </Card>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Plugins Directory</CardTitle>
          <CardDescription>
            The directory within your project, in which your plugins are located.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Plugins Directory"
            value={pluginsDirectory}
            onChange={(e) => setPluginsDirectory(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={allowAdminChange}
              onChange={(e) => setAllowAdminChange(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm">Allow administrators to change the directory.</label>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default AdminSettings;