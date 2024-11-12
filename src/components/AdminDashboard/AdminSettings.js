import { useState, useEffect } from "react";
import Button from "../ui/Button"; 
import Card from "../ui/Card"; 
import CardHeader from "../ui/CardHeader"; 
import CardContent from "../ui/CardContent"; 
import CardTitle from "../ui/CardTitle"; 
import CardDescription from "../ui/CardDescription";
import Toast from "../ui/Toast";

const AdminSettings = () => {
  const [storeName, setStoreName] = useState("My Awesome Store");
  const [pluginsDirectory, setPluginsDirectory] = useState("/content/plugins");
  const [allowAdminChange, setAllowAdminChange] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    // Fetch settings on load if needed
  }, []);

  const handleSave = () => {
    if (!storeName || !pluginsDirectory) {
      setToastMessage("Please fill in all fields.");
      setToastVisible(true);
      return;
    }
    setToastMessage("Settings Saved Successfully!");
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return (
    <div className="p-6 bg-gray-100 space-y-8">
      <h2 className="text-3xl font-semibold mb-6">Settings</h2>

      {/* Store Branding Section */}
      <Card className="mb-6">
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
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
          />
        </CardContent>
      </Card>

      {/* Plugins Directory Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Plugins Directory</CardTitle>
          <CardDescription>
            Specify the directory where your plugins are stored.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Plugins Directory"
            value={pluginsDirectory}
            onChange={(e) => setPluginsDirectory(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={allowAdminChange}
              onChange={(e) => setAllowAdminChange(e.target.checked)}
              className="mr-2 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="text-sm">Allow admins to change this setting</label>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave}>Save Settings</Button>

      {toastVisible && (
        <Toast message={toastMessage} onClose={() => setToastVisible(false)} />
      )}
    </div>
  );
};

export default AdminSettings;
