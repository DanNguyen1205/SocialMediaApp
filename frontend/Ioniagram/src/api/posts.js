import axios, * as others from "axios"

//POSTS
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

export function getPostsProfile(profileid) {
  const url = "http://localhost:8081/Ioniagram/GetPostsProfile/" + "?userid=" + profileid

  return axios.get(url)
    .then((res) =>
      res.data
    )

}

//COMMENTS
export function getComments(postid) {
  const url = "http://localhost:8081/Ioniagram/GetComments" + "/?postid=" + postid
  return axios.get(url)
    .then((res) =>
      res.data
    )
}

export function createComment({ body }) {
  const url = "http://localhost:8081/Ioniagram/Comment/"
  return axios.post(url, body)
}

//LIKES
export function getLikes(postid) {
  const url = "http://localhost:8081/Ioniagram/GetLikes/" + "?postid=" + postid
  return axios.get(url)
    .then((res) =>
      res.data
    )
}

export function addLike({ userid, postid }) {
  const url = "http://localhost:8081/Ioniagram/Like/"
  return axios.post(url, {
    userid: userid,
    postid: postid
  })
}

export function deleteLike({ userid, postid }) {
  const url = "http://localhost:8081/Ioniagram/DeleteLike/"
  return axios.delete(url, {
    data: {
      userid: userid,
      postid, postid
    }
  })
}

//FOLLOW
export function getFollowers(profileid) {
  const url = "http://localhost:8081/Ioniagram/GetFollowers/" + "?userid=" + profileid
  return axios.get(url)
    .then((res) =>
      res.data
    )
}

export function follow({ followerUserid, followedUserid }) {
  const url = "http://localhost:8081/Ioniagram/Follow/"
  return axios.post(url, {
    followerUserid: followerUserid,
    followedUserid, followedUserid
  })
}

export function unfollow({ followerUserid, followedUserid }) {
  const url = "http://localhost:8081/Ioniagram/Unfollow/"
  return axios.delete(url, {
    data: {
      followerUserid: followerUserid,
      followedUserid, followedUserid
    }
  })
}


