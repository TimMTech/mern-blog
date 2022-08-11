import { useState } from "react";
import { FormContainer, StandardForm, StandardField,StandardTextarea, SubmitButton } from "../GlobalFormStyle";
import { handleEmailjs } from "../../../config/emailjs/emailjsConfig";

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
      e.preventDefault()
    handleEmailjs(contactValue)
    setContactValue({
        email: "",
        message: ""
    })
  }

  return (
    <FormContainer>
      <StandardForm onSubmit={handleContactSubmit}>
        Contact Us!
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
        <SubmitButton type="submit">Contact</SubmitButton>
      </StandardForm>
    </FormContainer>
  );
};

export default ContactForm;

