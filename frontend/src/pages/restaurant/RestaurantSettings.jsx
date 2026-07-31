import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function RestaurantSettings() {

  const [restaurant, setRestaurant] = useState(null);


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
    delivery_radius: 5,
  });



  useEffect(() => {
    getRestaurant();
  }, []);



  const getRestaurant = async () => {

    try {

      const response = await api.get(
        "/restaurants/"
      );


      const data = response.data[0];

      setRestaurant(data);

      setFormData(data);


    } catch(error) {

      console.log(error);

    }

  };



  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const updateRestaurant = async(e)=>{

    e.preventDefault();


    try {

      await api.put(
        `/restaurants/${restaurant.id}`,
        formData
      );


      alert(
        "Restaurant Updated Successfully"
      );


      getRestaurant();


    } catch(error){

      alert(
        error.response?.data?.detail ||
        "Update Failed"
      );

    }

  };



  return (

    <>

      <Navbar />


      <div className="flex">


        <Sidebar />


        <div className="flex-1 p-8">


          <h1 className="text-4xl font-bold mb-8">
            Restaurant Settings
          </h1>



          <form
            onSubmit={updateRestaurant}
            className="grid grid-cols-2 gap-5 max-w-5xl"
          >


            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Restaurant Name"
              className="border p-3 rounded"
            />



            <input
              name="cuisine"
              value={formData.cuisine || ""}
              onChange={handleChange}
              placeholder="Cuisine"
              className="border p-3 rounded"
            />



            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Description"
              className="border p-3 rounded col-span-2"
            />



            <input
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Address"
              className="border p-3 rounded"
            />



            <input
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              placeholder="City"
              className="border p-3 rounded"
            />



            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-3 rounded"
            />



            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded"
            />



            <input
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
              placeholder="Restaurant Image"
              className="border p-3 rounded"
            />



            <input
              type="time"
              name="opening_time"
              value={formData.opening_time || ""}
              onChange={handleChange}
              className="border p-3 rounded"
            />



            <input
              type="time"
              name="closing_time"
              value={formData.closing_time || ""}
              onChange={handleChange}
              className="border p-3 rounded"
            />



            <input
              type="number"
              name="delivery_radius"
              value={formData.delivery_radius || 5}
              onChange={handleChange}
              placeholder="Delivery Radius KM"
              className="border p-3 rounded"
            />



            <button
              className="bg-orange-600 text-white p-3 rounded col-span-2"
            >
              Update Restaurant
            </button>


          </form>


        </div>


      </div>


    </>

  );
}


export default RestaurantSettings;