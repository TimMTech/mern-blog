import axios from "axios"

export const login = (loginValue) => {
    axios
        .post("http://localhost:3000/api/account/login", loginValue)
        .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data))
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
}