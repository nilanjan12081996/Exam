import { createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext()
const AuthProvider=({children})=>{
    const[auth,setAuth]=useState(
        {
            data:null,
            token:"",
        }
    )
    useEffect(()=>{
        const datas=localStorage.getItem('auth')
        if(datas)
        {
            const parseData=JSON.parse(datas)
            console.log(datas);
            setAuth({
                ...auth,
                data:parseData.data,
                token:parseData.token
            })
        }
    },[])
    return(
        <>
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
        
        </>
    )

}
const useAuth=()=>useContext(AuthContext)
export{useAuth,AuthProvider}