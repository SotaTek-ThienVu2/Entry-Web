import axios from "axios";
const BaseUrl = process.env.REACT_APP_API_ENDPOINT;
export const get = async (url) => {
    const src = BaseUrl + '/' + url
    const res = await axios.get(src).catch((err) => {throw new Error(err)});
    return res.data;
}

export const post = async (url, data) => {
    const src = BaseUrl + '/' + url
    const res = await axios.post(src, data).catch((err) => {throw new Error(err)});
    return res.data
}

export const put = async (url, data) => {
    const src = BaseUrl + '/' + url
    const res = await axios.put(src, data).catch((err) => {throw new Error(err)});
    return res.data
}