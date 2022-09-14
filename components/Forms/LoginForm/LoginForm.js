import {
  FormContainer,
  SubmitButton,
  LogoutButton,
  DashButton,
  StandardField,
  FieldContainer,
  StandardForm,
  StyledLabel,
  LineBreakContainer,
  FormTitle,
  Line,
  
} from "../GlobalFormStyle";

import { useSession, signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let options = { redirect: false, username, password };
    const res = await signIn("credentials", options);
    if (res?.error) {
      toast.error("Invalid username/password");
    }
    
  };

  

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("success logout");
    } else if (status === "authenticated") {
      toast.success("Logged in!");
    }
  }, [status, router]);
  return (
    <FormContainer>
      <FormTitle>
        {session ? `Welcome ${session.user.email}!` : "Login to your account"}
      </FormTitle>
      {!session && (
        <SubmitButton
          onClick={() => signIn("google", { redirect: "/auth/login" })}
        >
          Login with Google
          
        </SubmitButton>
      )}
      {!session && (
        <StandardForm onSubmit={handleSubmit} loginform="true">
          <LineBreakContainer>
            <Line />
            or
            <Line />
          </LineBreakContainer>
          <FieldContainer loginform="true">
            <StyledLabel>Username</StyledLabel>
            <StandardField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
            />
            <StyledLabel>Password</StyledLabel>
            <StandardField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
            />
          </FieldContainer>
          <SubmitButton type="submit">Login</SubmitButton>
        </StandardForm>
      )}
      {session && (
        <>
          <LogoutButton onClick={() => signOut()}>
            Log out {session.user.email}
          </LogoutButton>
          <NextLink href={`/user/${session.user._id}`}>
            <DashButton>Go to dashboard</DashButton>
          </NextLink>
        </>
      )}
    </FormContainer>
  );
};

export default LoginForm;
