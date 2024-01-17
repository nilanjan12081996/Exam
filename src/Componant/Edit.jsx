import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from "../Context/Auth"
import axios from "axios"
const initialState = {
    id: {},
    title: "",
    description: "",
    image: null,
  }
  const Edit = () => {
    const {id} = useParams()        
    const [product, setProduct] = useState(initialState);
      
      const [auth] = useAuth();
      const nav = useNavigate()
    console.log('id', product.id);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setProduct({
          ...product,
          image: e.target.files[0],
        });
      };

      const getData = async ()=>{
        const response = await axios.get(`https://wtsacademy.dedicateddevelopers.us/api/product/detail/${id}`, {
            headers: {
                "x-access-token": auth.token,
            }
        })
        setProduct(response?.data?.data)
        console.log('data', response?.data?.data);
    }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("id", id);
        formDataToSend.append("title", product.title);
        formDataToSend.append("description", product.description);
        formDataToSend.append("image", product.image);
    
        const response = await axios.post(" https://wtsacademy.dedicateddevelopers.us/api/product/update", formDataToSend, {
          headers: {
            "x-access-token": auth.token,
          },
        });
    
        if (response.data && response.data.status == 200) {
          console.log("reg", response?.data);
         
          nav('/read')
        } else {
          console.log("Error");
        
        }
      };

      useEffect(()=>{
      getData()
      },[auth.token])
      return(
      <>
         <form onSubmit={handleSubmit}>
    
    <div class="form-group">
    <label for="exampleInputEmail1">Title</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    value={product.title}
    name="title"
    onChange={e=>handleInputChange(e)}
    placeholder="Enter Product Title"/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Description</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    value={product.description}
    name="description"
    onChange={e=>handleInputChange(e)}
    placeholder="Enter product Description"
    />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Upload Photo</label>
    <input type="file" class="form-control"
     name="image" value={product.class}
      onChange={(e) => handleFileChange(e)}
      accept="image/*"/>
      
  </div>
  <button type="submit" class="btn btn-primary">Update</button>
</form>

      </>)
}

  export default Edit