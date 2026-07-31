import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  createRestaurant,
  getMyRestaurant,
} from "../../services/restaurantService";

function MyRestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    image: "",
    opening_time: "",
    closing_time: "",
  });

  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    loadRestaurant();
  }, []);

  const loadRestaurant = async () => {
    try {
      const data = await getMyRestaurant();

      setRestaurant(data);

      setFormData({
        name: data.name || "",
        description: data.description || "",
        cuisine: data.cuisine || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        pincode: data.pincode || "",
        phone: data.phone || "",
        email: data.email || "",
        image: data.image || "",
        opening_time: data.opening_time || "",
        closing_time: data.closing_time || "",
      });
    } catch (error) {
      console.log("No restaurant found.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await createRestaurant(formData);

      alert("Restaurant Created Successfully!");

      setRestaurant(response.restaurant);

      setFormData({
        name: "",
        description: "",
        cuisine: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: "",
        image: "",
        opening_time: "",
        closing_time: "",
      });

    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Failed to create restaurant");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-8">
            My Restaurant
          </h1>

          {restaurant && (
            <div className="bg-white rounded-xl shadow-lg border p-6 mb-8">
              <h2 className="text-2xl font-bold text-orange-600 mb-4">
                Restaurant Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <p><strong>Name:</strong> {restaurant.name}</p>
                <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                <p><strong>Phone:</strong> {restaurant.phone}</p>
                <p><strong>Email:</strong> {restaurant.email}</p>
                <p><strong>City:</strong> {restaurant.city}</p>
                <p><strong>State:</strong> {restaurant.state}</p>
                <p><strong>Pincode:</strong> {restaurant.pincode}</p>
                <p><strong>Opening:</strong> {restaurant.opening_time}</p>
                <p><strong>Closing:</strong> {restaurant.closing_time}</p>

                <div className="col-span-2">
                  <p><strong>Address:</strong> {restaurant.address}</p>
                </div>

                <div className="col-span-2">
                  <p><strong>Description:</strong></p>
                  <p>{restaurant.description}</p>
                </div>
              </div>
            </div>
          )}

          {!restaurant && (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-5 max-w-5xl"
            >

              <input
                name="name"
                placeholder="Restaurant Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="cuisine"
                placeholder="Cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded-lg p-3 col-span-2"
                rows="4"
              />

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Restaurant Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="opening_time"
                type="time"
                value={formData.opening_time}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                name="closing_time"
                type="time"
                value={formData.closing_time}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 col-span-2"
              >
                {loading ? "Creating..." : "Create Restaurant"}
              </button>

            </form>
          )}

        </div>
      </div>
    </>
  );
}

export default MyRestaurant;