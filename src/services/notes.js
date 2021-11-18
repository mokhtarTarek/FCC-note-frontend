import axios from 'axios'

// const baseUrl = 'https://boiling-wildwood-59895.herokuapp.com/api/notes'
//relative url : production mode
const baseUrl = '/api/notes'

let token = null;
const setToken = newToken =>{
    token = `bearer ${newToken}`
}


const getAll = () => {
    const request = axios.get(baseUrl)//request is a promise
    return request.then(res=>res.data) //access the result of the promise using then()
}
// create is an async function, the result will be stored in res  
const create = async newObject => {
    const config = {
        headers: {Authorization: token}
    }
    const res = await axios.post(baseUrl,newObject,config)
    return res.data
}

const update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response=>response.data)
}

const noteService = 
    {
    getAll,
    create,
    update,
    setToken
    }
export default noteService;