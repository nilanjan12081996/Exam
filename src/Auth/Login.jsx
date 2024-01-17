import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/Auth"
import { useState } from "react"

const Login=()=>{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[auth,setAuth]=useAuth()
    const nevigate=useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post("https://wtsacademy.dedicateddevelopers.us/api/user/signin",{
                email,
                password
            })
            console.log(res?.data);
            if(res?.data)
            {
                console.log(res?.data?.message);
                setAuth({
                    ...auth,
                    data:res?.data?.data,
                    token: res?.data?.token
                })
                console.log(res);
                nevigate('/')
                localStorage.setItem("auth",JSON.stringify(res?.data))
            }
            else{
                console.log(res?.data?.message)
            }
       
        } catch (error) {
            console.log(error);
            
        }
    }
    return(
        <>
         <form onSubmit={handlesubmit}>
   
   <div class="form-group">
     <label for="exampleInputEmail1">Email </label>
     <input type="email" class="form-control" id="exampleInputEmail1" 
     aria-describedby="emailHelp"
     value={email}
     onChange={(e)=>{setEmail(e.target.value)}}
     placeholder="Enter Your Email"
     />
      </div>
   <div class="form-group">
     <label for="exampleInputPassword1">Password</label>
     <input type="password" class="form-control" id="exampleInputPassword1"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
     placeholder="Enter Your Password"
     
     />
   </div>
   <button type="submit" class="btn btn-primary">Login</button>
   <Link to='/register'>Don't Have Account?Register Here</Link>
 </form>
        </>
    )
}
export default Login