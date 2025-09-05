// import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { getUser } from "../../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  // preview-start
  const providers = [{ id: "credentials", name: "Email and Password" }];
  const theme = useTheme();
  // preview-end

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // States of Redux Toolkit
  const { user } = useAppSelector((state) => state.states);
  console.log(user);

  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    // provider,
    __,
    formData
  ) => {
    // const promise = new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     alert(
    //       `Signing in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}`
    //     );
    //     resolve();
    //   }, 300);
    // });
    // return promise;
    try {
      if (
        formData.get("email") === user.email &&
        formData.get("password") === user.password
      ) {
        localStorage.setItem("access_token", `${user.email}&${user.password}`);
        const { data } = await axios.post(
          "http://localhost:3000/signedInUser",
          user
        );
        console.log(data);

        alert("You successfully signed in to your account");
        navigate("/admin");
      } else {
        alert("Your username or password is incorrect");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    // preview-start
    <AppProvider theme={theme}>
      <div
        className="block"
        style={{
          display: `flex`,
          flexDirection: `column`,
        }}
      >
        <SignInPage
          signIn={signIn}
          providers={providers}
          slotProps={{ emailField: { autoFocus: false } }}
        />
      </div>
    </AppProvider>
    // preview-end
  );
};

export default SignIn;
