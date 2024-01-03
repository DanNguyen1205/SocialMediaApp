import axios, * as others from "axios"

export async function createPost({ formData, userid }) {
  const url = "http://localhost:8081/Ioniagram/Post" + "/?userid=" + userid
  await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export function getPosts() {
  const userid = JSON.parse(localStorage.getItem("userid"))

  return axios.get("http://localhost:8081/Ioniagram/GetPosts" + "/?userid=" + userid)
    .then((res) => 
       res.data
    )
}