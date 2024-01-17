import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/Auth"

const Create=()=>{
    const initialState={
        title:"",
        description:"",
        image:""
    }
    const[auth]=useAuth()
    const[product,setProduct]=useState(initialState)
    const[img,setImg]=useState()
    const nevigate=useNavigate()
    let name,value
    const postUser=(e)=>{
        name=e.target.name
        value=e.target.value
        setProduct({...product,[name]:value})
    }
    const submitInfo=async(e)=>{
        e.preventDefault()

        let formData=new FormData()
        formData.append("title",product.title)
        formData.append("description",product.description)
        formData.append("image",img)
        try {
            const accessToken=auth.token
            const headers = {
                'x-access-token': accessToken
            }
            const res=await axios.post("https://wtsacademy.dedicateddevelopers.us/api/product/create",formData,{headers})
            if(res)
            {
                console.log("Data Saved Successfully");
                nevigate('/read')
            }
            else{
                console.log("Problem occure");
            }
        } catch (error) {
            console.log("Something went wrong");
        }
    }
   
    return(
        <>
        <h1>Add Product</h1>
        <form onSubmit={submitInfo}>
    
    <div class="form-group">
    <label for="exampleInputEmail1">Title</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    value={product.title}
    name="title"
    onChange={e=>postUser(e)}
    placeholder="Enter Product Title"/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Description</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    value={product.description}
    name="description"
    onChange={e=>postUser(e)}
    placeholder="Enter product Description"
    />
  </div>

 
  <div class="form-group">
    <label for="exampleInputPassword1">Upload Photo</label>
    <input type="file" class="form-control"
     name="img" value={product.class}
      onChange={(e) => setImg(e.target.files[0])}
      accept="image/*"/>
      {
        img!==""&&img!==undefined&&img!==null?(
          <img
          style={{ height: "100px" }}
          src={URL.createObjectURL(img)}
          alt=""
          className="upload-img"
      />
        ):(
          <>
          {img === "" && <p>Drag or drop content here</p>}
          </>
        )
      }
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </>
    )
}
export default Create