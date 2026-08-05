import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";



function AIChatbot(){


  const [messages,setMessages] = useState([]);

  const [input,setInput] = useState("");





  useEffect(()=>{

    fetchHistory();

  },[]);







  // Load Chat History

  const fetchHistory = async()=>{


    try{


      const response = await api.get(

        "/chatbot/history"

      );



      const history=[];



      response.data.forEach(item=>{


        history.push({

          sender:"user",

          text:item.user_message

        });



        history.push({

          sender:"bot",

          text:item.bot_response,

          category:item.category

        });



      });



      setMessages(history);



    }

    catch(error){

      console.log(error);

    }


  };









  // Send Message

  const sendMessage = async()=>{


    if(!input)

      return;





    const userMessage={


      sender:"user",

      text:input


    };





    setMessages(prev=>[

      ...prev,

      userMessage

    ]);







    try{


      const response = await api.post(

        "/chatbot/",

        {

          message:input

        }

      );





      const botMessage={


        sender:"bot",

        text:response.data.response,

        category:response.data.category


      };





      setMessages(prev=>[

        ...prev,

        botMessage

      ]);



    }


    catch(error){


      console.log(error);


    }





    setInput("");

  };






  const quickMessage=(text)=>{


    setInput(text);


  };






return(

<>

<Navbar />



<div className="
flex
min-h-screen
bg-gray-100
">



<Sidebar />



<div className="
flex-1
p-8
">



<div className="
bg-white
rounded-2xl
shadow-xl
h-[650px]
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


<h1 className="
text-2xl
font-bold
">

🤖 FoodExpress AI Support

</h1>



<p>

Ask anything about orders, delivery and refunds

</p>


</div>

{/* Chat Area */}

<div className="
flex-1
p-5
overflow-y-auto
space-y-4
">


{

messages.map((msg,index)=>(


<div

key={index}

className={

msg.sender==="user"

?

"flex justify-end"

:

"flex justify-start"

}

>



<div

className={

msg.sender==="user"

?

"bg-orange-500 text-white px-5 py-3 rounded-2xl max-w-md"

:

"bg-gray-200 px-5 py-3 rounded-2xl max-w-md"

}

>


<p>

{msg.text}

</p>



{

msg.category &&

<p className="
text-xs
mt-2
">

Category:
{msg.category}

</p>

}


</div>


</div>


))


}


</div>







{/* Quick Support Buttons */}


<div className="
px-5
pb-4
flex
gap-3
flex-wrap
">



<button

onClick={()=>quickMessage("Where is my order?")}

className="
bg-orange-100
text-orange-600
px-4
py-2
rounded-xl
"

>

📦 My Order

</button>




<button

onClick={()=>quickMessage("Track my delivery")}

className="
bg-orange-100
text-orange-600
px-4
py-2
rounded-xl
"

>

🚴 Track Delivery

</button>





<button

onClick={()=>quickMessage("I need refund")}

className="
bg-orange-100
text-orange-600
px-4
py-2
rounded-xl
"

>

💰 Refund

</button>





<button

onClick={()=>quickMessage("Help me")}

className="
bg-orange-100
text-orange-600
px-4
py-2
rounded-xl
"

>

❓ Help

</button>



</div>








{/* Input Area */}


<div className="
p-5
border-t
flex
gap-3
">


<input


value={input}


onChange={
(e)=>setInput(e.target.value)
}



placeholder="Ask FoodExpress AI..."



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
rounded-xl
"


>

Send 🚀

</button>



</div>






</div>


</div>


</div>


</>


);


}


export default AIChatbot;