import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function CustomerLayout({children}){

return (

<div className="flex">

<Sidebar />


<div className="flex-1">

<Navbar />

{children}

</div>


</div>

)

}


export default CustomerLayout;