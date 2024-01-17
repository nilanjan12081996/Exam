import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../Context/Auth"
import axios from "axios"

const Details=()=>{
    const[auth]=useAuth()
    const{id}=useParams()
    const[detail,setDetail]=useState({})
    const getDetails=async()=>{
        try {
            const accessToken = auth.token
            console.log(accessToken)

            const headers = {
                'x-access-token': accessToken
            }
            const res=await axios.get(`https://wtsacademy.dedicateddevelopers.us/api/product/detail/${id}`,{
                headers
            })
            console.log(res?.data?.data);
            setDetail(res?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getDetails()
    },[auth.token])
    return(
        <>
        <div class="card" style={{width: '18rem'}}>
  <img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${detail.image}`} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{detail.title}</h5>
    <p class="card-text">{detail.description}</p>
    
  </div>
</div>
        </>
    )
}
export default Details