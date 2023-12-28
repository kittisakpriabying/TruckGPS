"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Thai Beverage Logistics Co., Ltd.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  
  const router = useRouter();
  const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name."),
    lastName: yup.string().required("Please enter your last name."),
    userId: yup.string().required("Please enter your user ID.").max(8),
    email: yup
      .string()
      .required("Please enter your email.")
      .email("Incoect email")
      .matches(/@(havi\.co\.th|thaibev\.com)$/, "Email must be from internal."),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(8, "Your password must be at least 8 characters.")
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]+$/,
        "Your password must include at least one number and one special character or uppercase letter."
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password.")
      .oneOf([yup.ref("password"), null], "Your password not match."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { firstName, lastName, userId, email, password } = data;

      const response = await fetch(`http://localhost:3000/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          userId,
          email,
          password,
        }), 
      });

      if (response.ok) {
        console.error("Re");
        const result = await response.json();
        alert("Sign up ")
        router.replace("/signIn");
    
      } else {
        // The API call failed
        console.error("API call failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during sign-up:", error);
    }
  };
 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={errors.firstName?.message}
                  error={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  helperText={errors.lastName?.message}
                  error={errors.lastName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("userId")}
                  fullWidth
                  id="userId"
                  label="User Id"
                  name="userId"
                  autoComplete="family-name"
                  helperText={errors.userId?.message}
                  error={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errors.email?.message}
                  error={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={errors.password?.message}
                  error={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("confirmPassword")}
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  helperText={errors.confirmPassword?.message}
                  error={errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#signIn"
                  variant="body2"
                  onClick={() => {
                    router.push("/signIn");
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
