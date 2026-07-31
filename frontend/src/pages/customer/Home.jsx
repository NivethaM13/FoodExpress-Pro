import Navbar from "../../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold">
          Customer Home
        </h1>

        <p className="mt-4 text-gray-600">
          Browse restaurants and order your favorite food.
        </p>
      </div>
    </>
  );
}

export default Home;