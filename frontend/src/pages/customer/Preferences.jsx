import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function Preferences() {

  const [preferences, setPreferences] = useState(null);

  const [formData, setFormData] = useState({
    food_type: "",
    delivery_note: "",
    special_instruction: "",
  });


  useEffect(() => {
    fetchPreferences();
  }, []);



  const fetchPreferences = async () => {

    try {

      const response = await api.get(
        "/customer/preferences"
      );

      if(response.data){

        setPreferences(response.data);

        setFormData({
          food_type: response.data.food_type || "",
          delivery_note: response.data.delivery_note || "",
          special_instruction:
            response.data.special_instruction || "",
        });

      }

    } catch(error){

      console.log(error);

    }

  };



  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const savePreferences = async(e)=>{

    e.preventDefault();

    try{

      await api.post(
        "/customer/preferences",
        formData
      );


      alert(
        "Preferences Saved Successfully"
      );


      fetchPreferences();


    }
    catch(error){

      alert(
        "Failed to save preferences"
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
            Order Preferences
          </h1>



          <form
            onSubmit={savePreferences}
            className="bg-white shadow rounded-xl p-6 max-w-xl space-y-5"
          >


            <select
              name="food_type"
              value={formData.food_type}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            >

              <option value="">
                Select Food Preference
              </option>

              <option value="VEG">
                Veg
              </option>

              <option value="NON_VEG">
                Non Veg
              </option>

              <option value="BOTH">
                Both
              </option>

            </select>



            <textarea
              name="delivery_note"
              placeholder="Delivery Note"
              value={formData.delivery_note}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              rows="3"
            />



            <textarea
              name="special_instruction"
              placeholder="Special Instructions"
              value={formData.special_instruction}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              rows="3"
            />



            <button
              className="bg-orange-600 text-white p-3 rounded w-full"
            >
              Save Preferences
            </button>


          </form>


        </div>

      </div>


    </>

  );

}


export default Preferences;