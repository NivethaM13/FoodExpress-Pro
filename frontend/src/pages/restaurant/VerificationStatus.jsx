import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function VerificationStatus() {

  const [verification, setVerification] = useState(null);


  useEffect(() => {
    fetchStatus();
  }, []);



  const fetchStatus = async () => {

    try {

      const response = await api.get(
        "/verification/my"
      );

      setVerification(response.data);

    } catch(error) {

      console.log(error);

    }

  };



  return (
    <>
      <Navbar />


      <div className="flex">

        <Sidebar />


        <div className="flex-1 p-8">


          <h1 className="text-4xl font-bold mb-8">
            Verification Status
          </h1>



          {verification ? (

            <div className="bg-white shadow rounded-xl p-6 max-w-xl">


              <h2 className="text-2xl font-bold text-orange-600 mb-5">
                Restaurant Verification
              </h2>


              <p className="mb-3">
                <b>GST Number:</b> {verification.gst_number}
              </p>


              <p className="mb-3">
                <b>License Number:</b> {verification.license_number}
              </p>


              <p className="mb-3">
                <b>Status:</b>{" "}

                <span
                  className={
                    verification.verification_status === "APPROVED"
                    ? "text-green-600 font-bold"
                    :
                    verification.verification_status === "REJECTED"
                    ? "text-red-600 font-bold"
                    :
                    "text-yellow-600 font-bold"
                  }
                >

                  {verification.verification_status}

                </span>

              </p>


              <p>
                <b>Admin Comment:</b>{" "}
                {verification.admin_comment || "No comment"}
              </p>


            </div>

          ) : (

            <p>
              Verification not submitted yet.
            </p>

          )}



        </div>

      </div>


    </>
  );
}


export default VerificationStatus;