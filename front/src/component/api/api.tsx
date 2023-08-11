import axios from "axios"
import { useEffect } from "react"
import sk from "socket.io-client"
import { useState } from "react"

const Instanse = axios.create(
    {
        baseURL: "http://localhost:3000/api",
        withCredentials: true,
    }
)

Instanse.interceptors.response.use(
    (response)=>{
        return response
    },
    (error) => {
        if(error.response.data.message == "Unauthorized")
            Instanse.get("/api/refresh")
    }
)


// function Access () {
//     // const [data, SetData] = useState("")
//     Instanse.get("/access")
//         .then((res) => {
//             // SetData(res.data);   
//     })
//     // return(data);
// }
// console.log(Access())
// export const socket = sk("http://localhost:3000/notification");

export default Instanse