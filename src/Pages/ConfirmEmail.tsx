import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const ConfirmEmail = () => {
    const[searchParams] = useSearchParams();
    const[status,setStatus] = useState("Confirm waiting...");


    useEffect(()=>{
     const token = searchParams.get("token");
     const email = searchParams.get("email");
     
     if (token && email) {
        fetch(`https://asp-net-web-api-ym61.onrender.com/api/users/confirm-email?email=${email}&token=${encodeURIComponent(token)}`,{
           method : "POST" 
        })
        .then(res => res.json())
        .then(data => setStatus("Email is confirmed"))
        .catch(err => setStatus("An Error Accured"));
     }
     else
     {
        setStatus("Invalid link");
     }
    },[]);
  return (
    <div>
      {status}
    </div>
  )
}

export default ConfirmEmail
