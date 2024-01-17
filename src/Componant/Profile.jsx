import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../Context/Auth"

const Profile=()=>{
   const[auth]=useAuth()
   const[user,setUser]=useState({})
   const getUserProfile=async()=>{
    try {
        
        const accessToken=auth.token
        const headers = {
            'x-access-token': accessToken
        }
        const res=await axios.get('https://wtsacademy.dedicateddevelopers.us/api/user/profile-details',
        {
            headers
        })
        setUser(res?.data)
        console.log(res?.data);
    } catch (error) {
        console.log('Error while fetching profile details', error);
    }
   }
   useEffect(()=>{
    getUserProfile()
   },[auth.token])
    return(
        <>
         <div class="card" style={{width: '18rem'}}>
  <img src={`https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${user?.data?.profile_pic}`} class="card-img-top" alt="profile Photo" height={'300px'} width={'100px'}/>
  <div class="card-body">
    <h5 class="card-title">First Name: {user?.data?.first_name}<br/>Last name:{user?.data?.last_name}</h5>
    <p class="card-text">Email:{user?.data?.email}</p>
   

  </div>
</div>  
        </>
    )
}
export default Profile