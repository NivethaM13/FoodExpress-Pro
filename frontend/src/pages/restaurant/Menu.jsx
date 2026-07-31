import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function Menu() {

  const [menus, setMenus] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    is_available: true,
  });


  const [editId, setEditId] = useState(null);



  useEffect(() => {
    fetchMenu();
  }, []);



  const fetchMenu = async () => {

    try {

      const response = await api.get("/menus/");

      setMenus(response.data);

    } catch(error) {

      console.log(error);

    }

  };



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "is_available"
        ? e.target.checked
        : e.target.value
    });

  };



  const saveMenu = async(e)=>{

    e.preventDefault();


    try {


      if(editId){

        await api.put(
          `/menus/${editId}`,
          formData
        );

        alert("Food Item Updated");

      }
      else{

        await api.post(
          "/menus/",
          formData
        );

        alert("Food Item Added");

      }



      setFormData({
        name:"",
        description:"",
        category:"",
        price:"",
        image:"",
        is_available:true,
      });


      setEditId(null);

      fetchMenu();



    }catch(error){

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Operation Failed"
      );

    }

  };




  const editMenu=(item)=>{

    setEditId(item.id);

    setFormData({

      name:item.name,

      description:item.description || "",

      category:item.category,

      price:item.price,

      image:item.image || "",

      is_available:item.is_available,

    });

  };




  const deleteMenu=async(id)=>{

    try{

      await api.delete(
        `/menus/${id}`
      );


      alert(
        "Food Item Deleted"
      );


      fetchMenu();


    }catch(error){

      alert(
        "Delete Failed"
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
            Restaurant Menu
          </h1>



          <form
            onSubmit={saveMenu}
            className="bg-white shadow rounded-xl p-6 max-w-xl space-y-4"
          >


            <input
              name="name"
              placeholder="Food Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />


            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />


            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />


            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />


            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />



            <label className="flex gap-2 items-center">

              <input
                type="checkbox"
                name="is_available"
                checked={formData.is_available}
                onChange={handleChange}
              />

              Available

            </label>



            <button
              className="bg-orange-600 text-white p-3 rounded w-full"
            >

              {editId
              ? "Update Food Item"
              : "Add Food Item"}

            </button>


          </form>





          <h2 className="text-3xl font-bold mt-10 mb-5">
            Menu Items
          </h2>





          <div className="grid grid-cols-3 gap-6">


            {menus.map((item)=>(


              <div
                key={item.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden"
              >



                {item.image && (

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 object-cover"
                  />

                )}



                <div className="p-5">


                  <h3 className="text-xl font-bold">
                    {item.name}
                  </h3>



                  <p className="text-gray-600 mt-2">
                    {item.description}
                  </p>



                  <p className="mt-2">
                    Category:
                    <b> {item.category}</b>
                  </p>



                  <p className="text-lg font-semibold mt-2">
                    ₹ {item.price}
                  </p>



                  <p className="mt-2">

                    {item.is_available
                    ? "Available 🟢"
                    : "Unavailable 🔴"}

                  </p>




                  <div className="mt-4 flex gap-3">


                    <button
                      onClick={()=>editMenu(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>



                    <button
                      onClick={()=>deleteMenu(item.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>


                  </div>


                </div>


              </div>


            ))}


          </div>



        </div>


      </div>


    </>

  );

}


export default Menu;