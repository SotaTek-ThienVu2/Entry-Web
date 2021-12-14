import axios from "axios";
const BaseUrl = process.env.REACT_APP_API_ENDPOINT;
const userID = "12"
export const get = async (url) => {
    const src = BaseUrl + '/' + url;
    const header = { 'userID':  userID}
    const res = await axios.get(src, {headers: header}).catch((err) => {throw new Error(err)});
    return res.data;
}

export const post = async (url, data) => {
    const src = BaseUrl + '/' + url;
    const header = { 'userID':  userID};
    const res = await axios.post(src, data, {headers: header}).catch((err) => {throw new Error(err)});
    return res.data
}

export const put = async (url, data) => {
    const src = BaseUrl + '/' + url;
    const header = { 'userID':  userID};
    const res = await axios.put(src, data, {headers: header}).catch((err) => {throw new Error(err)});
    return res.data
}