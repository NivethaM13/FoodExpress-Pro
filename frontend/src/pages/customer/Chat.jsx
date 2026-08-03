import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";


function Chat({
  receiverId = 3,
  chatType = "CUSTOMER_RESTAURANT",
  title = "Chat with Restaurant 🍔"
}) {


  const [messages,setMessages] = useState([]);

  const [message,setMessage] = useState("");

  const [imageUrl,setImageUrl] = useState("");



  useEffect(()=>{

    fetchChat();

  },[receiverId]);




  const fetchChat = async()=>{

    try{

      const response = await api.get(
        `/chats/${receiverId}`
      );

      setMessages(response.data);

    }
    catch(error){

      console.log(error);

    }

  };





  const uploadImage = async(e)=>{


    const file = e.target.files[0];


    if(!file)
      return;



    const formData = new FormData();


    formData.append(
      "file",
      file
    );



    try{


      const response = await api.post(

        "/upload/chat-image",

        formData,

        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }

      );



      setImageUrl(
        response.data.image_url
      );


    }
    catch(error){

      console.log(error);

    }


  };






  const sendMessage = async()=>{


    if(!message && !imageUrl)
      return;



    try{


      await api.post(

        "/chats/",

        {

          receiver_id: receiverId,

          message: message,

          image_url: imageUrl,

          chat_type: chatType

        }

      );



      setMessage("");

      setImageUrl("");

      fetchChat();


    }
    catch(error){

      console.log(error);

    }


  };







return(

<>


<Navbar />


<div className="flex min-h-screen bg-gray-100">


<Sidebar />



<div className="flex-1 p-8">


<div className="
bg-white
rounded-2xl
shadow-xl
h-[600px]
flex
flex-col
">



{/* Header */}

<div className="
bg-orange-500
text-white
p-5
rounded-t-2xl
">


<h1 className="text-2xl font-bold">

{title}

</h1>


<p>
FoodExpress Chat 💬
</p>


</div>





{/* Messages */}


<div className="
flex-1
p-5
overflow-y-auto
space-y-4
">


{
messages.map((item)=>(


<div

key={item.id}

className={

item.sender_id === 1

?

"flex justify-end"

:

"flex justify-start"

}

>


<div

className={

item.sender_id === 1

?

"bg-orange-500 text-white px-5 py-3 rounded-2xl max-w-md"

:

"bg-gray-200 px-5 py-3 rounded-2xl max-w-md"

}

>


{
item.message && (

<p>
{item.message}
</p>

)

}



{
item.image_url && (

<img

src={
`http://127.0.0.1:8000${item.image_url}`
}

alt="chat"

className="
mt-3
rounded-xl
max-w-xs
"

/>

)

}



</div>


</div>


))

}


</div>







{/* Input */}


<div className="
p-5
border-t
flex
gap-3
items-center
">


<label

className="
cursor-pointer
text-2xl
"

>

📷

<input

type="file"

hidden

onChange={uploadImage}

/>

</label>




<input

value={message}

onChange={
(e)=>setMessage(e.target.value)
}

placeholder="Type message..."

className="
flex-1
border
rounded-xl
px-5
py-3
"

/>




<button

onClick={sendMessage}

className="
bg-orange-500
text-white
px-6
py-3
rounded-xl
hover:bg-orange-600
"

>

Send

</button>



</div>



</div>


</div>


</div>


</>


);


}


export default Chat;