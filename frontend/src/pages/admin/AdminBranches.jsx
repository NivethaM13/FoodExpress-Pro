import { useEffect, useState } from "react";
import api from "../../services/api";


function AdminBranches() {

  const [branches, setBranches] = useState([]);

  const [formData, setFormData] = useState({
    restaurant_id: "",
    manager_id: "",
    branch_name: "",
    location: "",
    phone: ""
  });



  useEffect(() => {

    fetchBranches();

  }, []);




  const fetchBranches = async () => {

    try {

      const response = await api.get("/branches/");

      setBranches(response.data);

    }
    catch(error){

      console.log(error);

    }

  };





  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };






  const addBranch = async(e)=>{

    e.preventDefault();


    try{

      await api.post(
        "/branches/",
        {
          ...formData,

          restaurant_id:
          Number(formData.restaurant_id),

          manager_id:
          Number(formData.manager_id)
        }
      );


      alert("Branch Added Successfully");


      fetchBranches();


      setFormData({

        restaurant_id:"",
        manager_id:"",
        branch_name:"",
        location:"",
        phone:""

      });


    }
    catch(error){

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Failed to add branch"
      );

    }

  };







  const deleteBranch = async(id)=>{

    try{

      await api.delete(
        `/branches/${id}`
      );


      alert("Branch Deleted");


      fetchBranches();


    }
    catch(error){

      console.log(error);

    }

  };







  return (

    <div className="p-8">


      <h1 className="text-3xl font-bold mb-6">

        🏪 Branch Management

      </h1>





      <form

      onSubmit={addBranch}

      className="bg-white shadow-lg rounded-xl p-6 mb-8 grid gap-4 md:grid-cols-2"

      >


        <input

        name="restaurant_id"

        placeholder="Restaurant ID"

        value={formData.restaurant_id}

        onChange={handleChange}

        className="border p-3 rounded"

        />



        <input

        name="manager_id"

        placeholder="Manager ID"

        value={formData.manager_id}

        onChange={handleChange}

        className="border p-3 rounded"

        />



        <input

        name="branch_name"

        placeholder="Branch Name"

        value={formData.branch_name}

        onChange={handleChange}

        className="border p-3 rounded"

        />



        <input

        name="location"

        placeholder="Location"

        value={formData.location}

        onChange={handleChange}

        className="border p-3 rounded"

        />



        <input

        name="phone"

        placeholder="Phone"

        value={formData.phone}

        onChange={handleChange}

        className="border p-3 rounded"

        />


        <button

        className="bg-orange-600 text-white rounded-lg px-5 py-3"

        >

        Add Branch

        </button>


      </form>







      <div className="grid md:grid-cols-3 gap-6">


      {
        branches.map((branch)=>(


          <div

          key={branch.id}

          className="bg-white shadow rounded-xl p-5"

          >


            <h2 className="text-xl font-bold">

              {branch.branch_name}

            </h2>


            <p>
              📍 {branch.location}
            </p>


            <p>
              👤 Manager ID: {branch.manager_id}
            </p>


            <p>
              Status: {branch.status}
            </p>



            <button

            onClick={()=>deleteBranch(branch.id)}

            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"

            >

            Delete

            </button>


          </div>


        ))

      }


      </div>



    </div>

  );

}


export default AdminBranches;