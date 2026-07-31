import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

function Profile() {

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    profile_image: "",
  });


  useEffect(() => {
    fetchProfile();
  }, []);


  const fetchProfile = async () => {
    try {
      const response = await api.get(
        "/customer/profile"
      );

      setProfile(response.data);

      setFormData({
        full_name: response.data.full_name,
        mobile: response.data.mobile,
        profile_image:
          response.data.profile_image || "",
      });

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



  const updateProfile = async(e)=>{

    e.preventDefault();

    try{

      await api.put(
        "/customer/profile",
        formData
      );

      alert(
        "Profile Updated Successfully"
      );

      fetchProfile();

    }
    catch(error){

      alert(
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
            My Profile
          </h1>


          <form
            onSubmit={updateProfile}
            className="bg-white shadow rounded-xl p-6 max-w-xl space-y-4"
          >

            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              placeholder="Name"
            />


            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              placeholder="Mobile"
            />


            <input
              name="profile_image"
              value={formData.profile_image}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              placeholder="Profile Image URL"
            />


            <button
              className="bg-orange-600 text-white p-3 rounded w-full"
            >
              Update Profile
            </button>


          </form>


        </div>

      </div>

    </>
  );
}


export default Profile;