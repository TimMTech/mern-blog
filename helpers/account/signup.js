import axios from "axios"

export const signup = (signUpValue) => {
  axios
    .post("http://localhost:3000/api/account/signup", signUpValue)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getsignup = () => {
  axios
    .get("http://localhost:3000/api/account/signup")
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
