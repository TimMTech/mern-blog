import emailjs from "@emailjs/browser";

const handleEmailjs = (inputValues) => {
  emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      inputValues,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then((response) => console.log("Sucess", response.status, response.text))
    .catch((error) => console.log(error));
};

export { handleEmailjs };
