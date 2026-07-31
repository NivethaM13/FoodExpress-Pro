import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-4 text-gray-600">
            Welcome to FoodExpress Pro Admin Panel.
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;