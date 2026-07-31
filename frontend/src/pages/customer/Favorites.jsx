import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";


function Favorites() {

  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    fetchFavorites();
  }, []);



  const fetchFavorites = async () => {

    try {

      const response = await api.get(
        "/customer/favorites"
      );

      setFavorites(response.data);

    } catch(error) {

      console.log(error);

    }

  };



  const removeFavorite = async(id)=>{

    try{

      await api.delete(
        `/customer/favorites/${id}`
      );

      alert(
        "Removed from favorites"
      );

      fetchFavorites();


    }catch(error){

      alert(
        "Failed to remove favorite"
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
            Favorite Restaurants ❤️
          </h1>


          <div className="grid grid-cols-2 gap-6">


            {favorites.length === 0 && (

              <p>
                No favorite restaurants added.
              </p>

            )}



            {favorites.map((restaurant)=>(

              <div
                key={restaurant.id}
                className="bg-white shadow rounded-xl p-6"
              >

                <h2 className="text-2xl font-bold text-orange-600">
                  {restaurant.name}
                </h2>


                <p className="mt-2">
                  {restaurant.cuisine}
                </p>


                <p>
                  {restaurant.city}
                </p>


                <button
                  onClick={()=>removeFavorite(restaurant.id)}
                  className="mt-4 bg-red-600 text-white px-5 py-2 rounded"
                >
                  Remove
                </button>


              </div>

            ))}


          </div>


        </div>


      </div>


    </>
  );
}


export default Favorites;