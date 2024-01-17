import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../Context/Auth"

const Header=()=>{
    const[auth,setAuth]=useAuth()
    const handleLogout=()=>{
        setAuth(
            {...auth,data:null,token:''}
        )
        localStorage.removeItem('auth')
      console.log("Logout Successfully");
    }
    return(
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">CRUD</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
        {
            !auth.data?(
                <>
            <li className="nav-item active">
        <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/create">Create</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/read">Read</Link>
      </li>
                </>
            ):(
                <>
        <li className="nav-item">
        <Link className="nav-link" to="/create">Create</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/read">Read</Link>
      </li>
      <li className="nav-item">
              <NavLink onClick={handleLogout} className="nav-link" to="/login">logout</NavLink>
            </li>
            <li className="nav-item">
                 
            
             <NavLink className="nav-link">Welcome {auth.data?.first_name}</NavLink>  
            
            </li>
            <li className="nav-item">
        <Link className="nav-link" to="/profile">Profile</Link>
      </li>

                </>
            )

            
        }
  
    
   
    </ul>
   
  </div>
</nav>
        </>
    )
}
export default Header