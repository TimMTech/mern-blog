import axios from "axios"

export const getComment = (callback) => {
    axios
        .get("http://localhost:3000/api/comment")
        .then((response) => {
            callback(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}

export const setComment = (commentValue) => {
    axios
        .post("http://localhost:3000/api/comment", commentValue)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}