import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

function Verification() {

  const [formData, setFormData] = useState({
    gst_number: "",
    license_number: "",
    gst_document: "",
    license_document: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const submitVerification = async (e) => {
    e.preventDefault();

    try {

      await api.post(
        "/verification/",
        formData
      );

      alert(
        "Verification Submitted Successfully"
      );

      setFormData({
        gst_number: "",
        license_number: "",
        gst_document: "",
        license_document: "",
      });

    } catch(error) {

      alert(
        error.response?.data?.detail ||
        "Submission Failed"
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
            Restaurant Verification
          </h1>


          <form
            onSubmit={submitVerification}
            className="bg-white shadow rounded-xl p-6 max-w-xl space-y-5"
          >


            <input
              name="gst_number"
              placeholder="GST Number"
              value={formData.gst_number}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />


            <input
              name="license_number"
              placeholder="License Number"
              value={formData.license_number}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />


            <input
              name="gst_document"
              placeholder="GST Document URL"
              value={formData.gst_document}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />


            <input
              name="license_document"
              placeholder="License Document URL"
              value={formData.license_document}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />


            <button
              className="bg-orange-600 text-white p-3 rounded w-full"
            >
              Submit Verification
            </button>


          </form>


        </div>

      </div>

    </>
  );
}

export default Verification;