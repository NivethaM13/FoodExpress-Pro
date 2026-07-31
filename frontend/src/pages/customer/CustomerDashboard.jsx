import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function CustomerDashboard() {
  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-4xl font-bold">
            Customer Dashboard
          </h1>

          <p className="mt-4 text-gray-600">
            Manage your profile, addresses, favorites and orders.
          </p>

        </div>

      </div>
    </>
  );
}

export default CustomerDashboard;