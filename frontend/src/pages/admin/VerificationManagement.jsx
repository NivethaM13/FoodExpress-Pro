import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function VerificationManagement() {

  const [requests, setRequests] = useState([]);


  useEffect(() => {
    fetchRequests();
  }, []);



  const fetchRequests = async () => {

    try {

      const response = await api.get(
        "/verification/admin/all"
      );

      setRequests(response.data);

    } catch(error) {

      console.log(error);

    }

  };



  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await api.put(
        `/verification/admin/${id}`,
        {
          verification_status: status,
          admin_comment:
            status === "APPROVED"
            ? "Documents verified successfully"
            : "Documents rejected"
        }
      );


      alert(
        "Status Updated"
      );


      fetchRequests();


    } catch(error) {

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
            Restaurant Verification Management
          </h1>



          <div className="grid gap-5">


            {requests.map((item)=>(

              <div
                key={item.id}
                className="bg-white shadow rounded-xl p-6"
              >

                <p>
                  <b>Restaurant ID:</b>{" "}
                  {item.restaurant_id}
                </p>


                <p>
                  <b>GST:</b>{" "}
                  {item.gst_number}
                </p>


                <p>
                  <b>License:</b>{" "}
                  {item.license_number}
                </p>


                <p>
                  <b>Status:</b>{" "}
                  {item.verification_status}
                </p>



                <div className="mt-4 space-x-3">


                  <button
                    onClick={() =>
                      updateStatus(
                        item.id,
                        "APPROVED"
                      )
                    }
                    className="bg-green-600 text-white px-5 py-2 rounded"
                  >
                    Approve
                  </button>



                  <button
                    onClick={() =>
                      updateStatus(
                        item.id,
                        "REJECTED"
                      )
                    }
                    className="bg-red-600 text-white px-5 py-2 rounded"
                  >
                    Reject
                  </button>


                </div>


              </div>

            ))}


          </div>


        </div>


      </div>


    </>
  );
}


export default VerificationManagement;