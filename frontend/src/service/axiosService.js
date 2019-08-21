import axios from 'axios';


export const weatherAxios = axios.create({
    baseURL:'http://dataservice.accuweather.com/'
})

weatherAxios.interceptors.response.use(res => res,error => {
    console.log('error : ',error);
    throw new Error(error)
})


export const dbAxios = axios.create({
    baseURL:'https://my-weather-65d57.firebaseio.com/'
})

dbAxios.interceptors.response.use(res => res,error => {
    console.log('error : ',error);
    throw new Error(error)
})


