import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Componant/Header"
const Register=()=>{
    const initialState={
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        profile_pic:""
        
    }
    const[user,setUser]=useState(initialState)
    const[img,setImg]=useState()
    const navigate=useNavigate()
    let name,value
    const postUser=(e)=>{
        name=e.target.name
        value=e.target.value
        setUser({...user,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        let formData=new FormData()
        formData.append("first_name",user.first_name)
        formData.append("last_name",user.last_name)
        formData.append("email",user.email)
        formData.append("password",user.password)
        formData.append("profile_pic",img)
        try {
            const res= await axios.post("https://wtsacademy.dedicateddevelopers.us/api/user/signup",formData)
            if(res)
            {
                console.log(res);
                console.log('reg successful');
                navigate('/login')
            }
            else{
                console.log("Registertraion faild");
            }
        } catch (error) {
            console.log("something went wrong");
        }
    }
    return(
    <>
    
    <h1>Registration</h1>
    <form onSubmit={handleSubmit}>
    
    <div class="form-group">
    <label for="exampleInputEmail1">First Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    value={user.first_name}
    name="first_name"
    onChange={e=>postUser(e)}
    placeholder="Enter your First Name"/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Last Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    value={user.last_name}
    name="last_name"
    onChange={e=>postUser(e)}
    placeholder="Enter your Last Name"
    />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    value={user.email}
    name="email"
    onChange={e=>postUser(e)}
    placeholder="Enter your Email"
    />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"
    value={user.password}
    name="password"
    onChange={e=>postUser(e)}
    placeholder="Enter your Password"
    />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Upload Photo</label>
    <input type="file" class="form-control"
     name="img" value={user.class}
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
export default Register