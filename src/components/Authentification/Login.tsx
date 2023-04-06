import { Button, TextField } from "@mui/material";
import Navigation from "../Navigation/Navigation";

import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { RegisterOptions, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { loginUser } from "../../services/userService";
import AlertModal from "../Utils/AlertModal";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";

interface IFormInput {
    username: string;
    password: string;
}

function Login () {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>(null);
    const {register, formState: { errors }, handleSubmit} = useForm<IFormInput>();
    const singIn = useSignIn();

    const passwordValidation : RegisterOptions<IFormInput, "password"> = { 
        required: "Please enter password",
        minLength: {
            value: 8,
            message: "Passwords must be at least 8 characters"
        }
    }

    const onSubmit = (data: IFormInput) => {
        loginUser({
            username: data.username,
            password: data.password,
            email: "",
        }).then((response) => {
            if(response.status === 200){
                // TODO manage JWT
                singIn({
                    token: response.data,
                    expiresIn: 1440,
                    tokenType: "Bearer",
                    authState: { username: data.username }
                })
                navigate("/");
            }
        }).catch(err => {
            setMessage(err.response.data);
        });
    }

    return(
        <>
            <Navigation title="Login"/>
            <div className={styles.container}>
                <form className={styles.center} onSubmit={handleSubmit(onSubmit)}>
                    <TextField label="Username" type="text" {...register("username", {required:"Username must be at least 3 characters long", minLength: {value: 3, message: "Username must be at least 3 characters long"}})}></TextField>
                    <ErrorMessage errors={errors} name="username" render={({ message }) => <div className={styles.warning}>{message}</div>}/>
                    <TextField label="Password" type="password" {...register("password", passwordValidation)}></TextField>
                    <ErrorMessage errors={errors} name="password" 
                        render={({ message }) => <div className={styles.warning} >{message}</div>}
                    />
                    <div className={styles.buttons}>
                        <Button type="submit" variant="outlined" className={styles.button}>Login</Button> {/* // TODO */}
                        <Button onClick={() => navigate("/register")} variant="outlined" className={styles.button}>Register</Button> {/* // TODO */}
                    </div>
                </form>
            </div>
            <AlertModal open={message != null} onClose={() => setMessage(null)} text={{title: "Credentials not correct", content: message}}/>
        </>
    );
}

export default Login;