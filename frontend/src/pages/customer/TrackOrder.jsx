import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";


import "leaflet/dist/leaflet.css";



function TrackOrder(){


  const [tracking,setTracking] = useState(null);



  const orderId = 1;



  useEffect(()=>{

    fetchTracking();

  },[]);



  const fetchTracking = async()=>{

    try{

      const response = await api.get(
        `/tracking/${orderId}`
      );


      setTracking(response.data);


    }catch(error){

      console.log(error);

    }

  };



  return(

    <>

    <Navbar />


    <div className="flex">

    <Sidebar />


    <div className="flex-1 p-8">


    <h1 className="text-4xl font-bold mb-8">
      Track Your Order 📍
    </h1>



    {
      tracking &&

      <div className="bg-white shadow rounded-xl p-6">


        <h2 className="text-2xl font-bold">
          Order #{tracking.order_id}
        </h2>



        <p className="mt-3">
          Status:
          <b> {tracking.delivery_status}</b>
        </p>



        <p>
          Estimated Delivery:
          <b> {tracking.estimated_time}</b>
        </p>



        <p>
          Route:
          <b> {tracking.route}</b>
        </p>



        <div className="mt-6">


        <MapContainer

          center={[
            tracking.latitude,
            tracking.longitude
          ]}

          zoom={15}

          style={{
            height:"400px",
            width:"100%"
          }}

        >


        <TileLayer

          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

        />


        <Marker

          position={[
            tracking.latitude,
            tracking.longitude
          ]}

        >

        <Popup>
          Delivery Partner Location 🚴
        </Popup>


        </Marker>


        </MapContainer>


        </div>



      </div>

    }



    </div>


    </div>


    </>

  );

}


export default TrackOrder;