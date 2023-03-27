import { Button, TextField } from "@mui/material";
import Navigation from "../Navigation/Navigation";

import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { RegisterOptions, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { loginUser } from "../../services/userService";
import AlertModal from "../AlertModal";
import { useState } from "react";

interface IFormInput {
    username: string;
    password: string;
}

function Login () {
    const navigate = useNavigate();
    const [isSHowing, setIsShowing] = useState(false);
    const [isSHowingPass, setIsShowingPass] = useState(false);
    const {register, formState: { errors }, handleSubmit} = useForm<IFormInput>();

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
            console.log(response);
            if(response.status === 200){
                navigate("/");
                // TO-DO manage JWT
            }
        }).catch(err => {
            if(err.response.data === "User not found!")
                setIsShowing(true);
            if(err.response.data === "Password wrong!")
                setIsShowingPass(true);
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
                        <Button type="submit" variant="outlined" className={styles.button}>Login</Button> {/* TO-DO */}
                        <Button onClick={() => navigate("/register")} variant="outlined" className={styles.button}>Register</Button> {/* TO-DO */}
                    </div>
                </form>
            </div>
            <AlertModal open={isSHowing} onClose={setIsShowing} text={{title: "Username not found", content: "Username was not found, please try again!"}}/>
            <AlertModal open={isSHowingPass} onClose={setIsShowingPass} text={{title: "Password incorect", content: "The password was not correct, please try again!"}}/>
        </>
    );
}

export default Login;