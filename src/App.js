// import logo from './logo.svg';
import './App.css';
import Register from './Auth/Register';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Home from './Componant/Home';
import Header from './Componant/Header';
import Create from './Componant/Create';
import Profile from './Componant/Profile';
import Read from './Componant/Read';
import Details from './Componant/Details';
import Edit from './Componant/Edit';

function App() {
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }
  const PublicRoute=[
    {
      path:'/',
      componant:<Home/>
    },
    {
      path:'/login',
      componant:<Login/>
    },
    {
      path: '/register',
      componant: <Register/>
    }
  ]
  const ProtectedRoute=[
    {
        path: '/create',
        component: <Create />
      
    },
    {
      path: '/profile',
      component: <Profile />
    
  },
  {
    path: '/read',
    component: <Read/>
  
},
{
  path:'read/detail/:id',
  component:<Details/>
},
{
  
    path:'/update/:id',
    component:<Edit/>
  
},
  ]
  return (
  <>

  <Router>
    <Header/>
    <Routes>
    {
        PublicRoute?.map((route,key)=>{
          return(
            <>
             <Route
              key={key+1}
            path={route.path}
            element={route.componant}
            />
            </>
           
          )
        })
      }
      {
      ProtectedRoute?.map((route,key)=>{
        return(
          <>
          <Route
          key={key+1}
          path={route.path}
          element={<PrivateRoute>{route.component}</PrivateRoute>}
          
          />
          </>
        )
      })
      }
      
    </Routes>
  </Router>
  
  </>
  );
}

export default App;
