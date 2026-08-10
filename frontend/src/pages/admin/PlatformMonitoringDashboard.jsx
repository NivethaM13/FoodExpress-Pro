import { useEffect, useState } from "react";

import api from "../../services/api";


function PlatformMonitoringDashboard(){

const [monitoring,setMonitoring] = useState([]);



useEffect(()=>{

fetchMonitoring();

},[]);



const fetchMonitoring = async()=>{

try{

const response = await api.get(
"/platform-monitoring/"
);

setMonitoring(response.data);

}
catch(error){

console.log(
"Platform Monitoring Error:",
error
);

}

};



return(

<div className="p-8">


<h1 className="
text-4xl
font-bold
mb-8
">

🛡️ Platform Monitoring & Security

</h1>



<div className="
grid
md:grid-cols-3
gap-6
">



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
🔌 API Monitoring
</h2>

<p className="mt-3">
Monitor API availability and status
</p>

</div>



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
🖥️ Server Health
</h2>

<p className="mt-3">
Track server performance
</p>

</div>




<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
🚨 Security Alerts
</h2>

<p className="mt-3">
Monitor security issues
</p>

</div>



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
📋 Audit Monitoring
</h2>

<p className="mt-3">
Track audit activities
</p>

</div>



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
💾 Backup Status
</h2>

<p className="mt-3">
Check backup and recovery
</p>

</div>



<div className="
bg-white
shadow
rounded-2xl
p-6
">

<h2 className="text-xl font-bold">
❌ Failed Requests
</h2>

<p className="mt-3">
Monitor failed API requests
</p>

</div>



</div>





<h2 className="
text-3xl
font-bold
mt-10
mb-5
">

📊 Monitoring Reports

</h2>



<div className="
grid
md:grid-cols-2
gap-6
">


{
monitoring.map((item)=>(


<div
key={item.id}
className="
bg-white
shadow
rounded-2xl
p-6
"
>


<h3 className="
text-xl
font-bold
">

{item.title}

</h3>



<p>
Type:
<b> {item.monitor_type}</b>
</p>



<p>
API:
<b> {item.api_status}</b>
</p>



<p>
Server:
<b> {item.server_health}</b>
</p>



<p>
Failed Requests:
<b> {item.failed_requests}</b>
</p>



<p>
Security Alert:

<b>
{
item.security_alert
?
" 🚨 YES"
:
" ✅ NO"
}
</b>

</p>



<p>
Audit Monitoring:

<b>
{
item.audit_monitoring
?
" ✅ Enabled"
:
" ❌ Disabled"
}
</b>

</p>



<p>
Backup:
<b>
{item.backup_status}
</b>
</p>



<p>
Recovery:
<b>
{item.recovery_status}
</b>
</p>



</div>


))

}


</div>


</div>

);

}


export default PlatformMonitoringDashboard;