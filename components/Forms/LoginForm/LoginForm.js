import {
  FormContainer,
  SubmitButton,
  LogoutButton,
  DashButton,
  StandardField,
  ErrorMessage,
  FieldContainer,
  StandardForm,
  StyledLabel,
  LineBreakContainer,
  FormTitle,
  Line,
} from "../GlobalFormStyle";
import Loading from "../../Loading/Loading";
import { useSession, signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [message, setMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let options = { redirect: false, username, password };
    const res = await signIn("credentials", options);
    setMessage(null);

    if (res?.error) {
      setMessage("Invalid Username/Password");
    } else {
      console.log("success");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("not logged in");
    } else if (status === "authenticated") {
      console.log("logged in");
    }
  }, [status, router]);
  return (
    <FormContainer>
      <FormTitle>Login to your account</FormTitle>
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
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </FormContainer>
  );
};

export default LoginForm;
