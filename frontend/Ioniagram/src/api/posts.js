import axios, * as others from "axios"

export function createPost({ formData, userid }) {
  const url = "http://localhost:8081/Ioniagram/Post" + "/?userid=" + userid
  return axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export function getPosts() {
  const userid = JSON.parse(localStorage.getItem("userid"))
  const url = "http://localhost:8081/Ioniagram/GetPosts" + "/?userid=" + userid
  
  return axios.get(url)
    .then((res) => 
       res.data
    )
}

export function getPostsOtherUser(){

}

//SETUP
export function getComments(postid){
  console.log(postid)
  const url = "http://localhost:8081/Ioniagram/GetComments" + "/?postid=" + postid
  return axios.get(url)
  .then((res) => 
     res.data
  )
}

export function createComment({body}){
  const url = "http://localhost:8081/Ioniagram/Comment/"
  return axios.post(url, body)
}