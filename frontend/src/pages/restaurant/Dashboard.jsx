import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-5xl font-bold">
            Restaurant Dashboard
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Manage your restaurant and menu here.
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;