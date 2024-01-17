import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../Context/Auth"
import { Link } from "react-router-dom"

const Read = () => {
    const [auth] = useAuth()
    const [pro, setPro] = useState([])
    const getPro = async () => {
        try {
            const accessToken = auth.token
            console.log(accessToken)

            const headers = {
                'x-access-token': accessToken
            }
            const res = await axios.post("https://wtsacademy.dedicateddevelopers.us/api/product/list",
                {
                    page: 1,
                    perpage: 10
                },
                {
                    headers
                },
            )
            console.log("token: ", headers);
            console.log(res?.data?.data);
            setPro(res?.data?.data)

        } catch (error) {
            console.log("Problem occur", error);
        }

    }
    useEffect(() => {
        getPro()
    }, [auth.token])
    const deleteProduct=async(id)=>{
        try {
            const accessToken = auth.token
            console.log(accessToken)

            const headers = {
                'x-access-token': accessToken
            }
            const data1=await axios.post("https://wtsacademy.dedicateddevelopers.us/api/product/remove",{
                id
            },{
                headers
            })
            getPro()
        } catch (error) {
            
        }
    }
    return (
        <>
            <div class="container">
                <div class="row">
                    {
                        pro?.map((items, index) => {
                            return (
                                <>
                                    <div class="col-sm">
                                        <div class="card" style={{ width: "18rem" }}>
                                            <img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${items?.image}`} class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h5 class="card-title">{items?.title}</h5>
                                                <p class="card-text">{items?.description}</p>
                                                <Link to={`read/detail/${items._id}`}><button>Details</button></Link>
                                                <Link to={`/update/${items._id}`}> <button>Update</button></Link>
                                                <button onClick={()=>{deleteProduct(items._id)}}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }



                </div>
            </div>

        </>
    )
}
export default Read