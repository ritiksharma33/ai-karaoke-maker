import axios from "axios";
//it is ofor the glueing the data in the url 
const api= axios.create({
    baseURL:"http://127.0.0.1:8000"
})

export default api;