import { useState } from "react";
import {
  FormContainer,
  StandardForm,
  StandardField,
  StandardTextarea,
  SubmitButton,
  FormTitle,
} from "../GlobalFormStyle";
import { handleEmailjs } from "../../../config/emailjs/emailjsConfig";
import {toast} from "react-toastify"

const ContactForm = () => {
  const [contactValue, setContactValue] = useState({
    email: "",
    message: "",
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    handleEmailjs(contactValue, (response) => {
      if (response.text === "OK") {
        toast.success("Email sent!")
      } else {
        toast.error("Server Error Occured")
      }
    })
    setContactValue({
      email: "",
      message: "",
    });
  };

  return (
    <FormContainer id="contact">
      <StandardForm onSubmit={handleContactSubmit}>
        <FormTitle>Contact Us!</FormTitle>
        <StandardField
          name="email"
          type="email"
          value={contactValue.email}
          onChange={(e) => handleContactChange(e)}
          placeholder="email"
        />
        <StandardTextarea
          name="message"
          value={contactValue.message}
          onChange={(e) => handleContactChange(e)}
          placeholder="message"
        />
        <SubmitButton type="submit" contactform="true">
          Contact
        </SubmitButton>
      </StandardForm>
    </FormContainer>
  );
};

export default ContactForm;
