import { Button, TextField } from "@mui/material";
import { RegisterOptions, useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import styles from "./Register.module.css"
import { useState } from "react";
import registerUser from "../../services/userService";
import AlertModal from "../Utils/AlertModal";

interface IFormInput {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

function Register () {
    const navigate = useNavigate();

    const {register, formState: { errors }, handleSubmit} = useForm<IFormInput>();

    const [identical, setIdentical] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const passwordValidation : RegisterOptions<IFormInput, "passwordConfirm"> = { 
        required: "Please enter password",
        minLength: {
            value: 8,
            message: "Passwords must be at least 8 characters"
        }
    }

    const onSubmit = (data: IFormInput) => {
        if(data.password !== data.passwordConfirm){
            setIdentical(true);
        }
        else{
            registerUser({
                username: data.username,
                email: data.email,
                password: data.password,
            }).then(response => {
                if(response.status === 200){
                    navigate("/");
                }
            }).catch(err => {
                setIsShowing(true);
            });
        }
    }

    return(
        <>
            <Navigation title="Register"/>
            <div className={styles.container}>
                <form className={styles.center} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={styles.title}>Create Account</h2>
                    <TextField label="Username" type="text" {...register("username", {required:"Username must be at least 3 characters long", minLength: {value: 3, message: "Username must be at least 3 characters long"}})}></TextField>
                    <ErrorMessage errors={errors} name="username" render={({ message }) => <div className={styles.warning}>{message}</div>}/>
                    <TextField label="E-mail" type="email" {...register("email", {required:"Must be a valid e-mail adress", pattern: {value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message:"Must be a valid e-mail adress"}})}></TextField>
                    <ErrorMessage errors={errors} name="email" render={({ message }) => <div className={styles.warning}>{message}</div>}/>
                    <TextField label="Password" type="password" {...register("password", passwordValidation)}></TextField>
                    <ErrorMessage errors={errors} name="password" 
                        render={({ message }) => <div className={styles.warning} >{message}</div>}
                    />
                    <TextField label="Confirm password" type="password" {...register("passwordConfirm", passwordValidation)}></TextField>
                    <ErrorMessage errors={errors} name="passwordConfirm" 
                        render={({ message }) => <div className={styles.warning} >{message}</div>}
                    />
                    {identical && <div className={styles.warning}>Passwords must match</div>}
                    <div className={styles.buttons}>
                        <Button type="submit" variant="outlined" className={styles.button} disabled={false}>Register</Button> {/* // TODO */}
                    </div>
                </form>
            </div>
            <AlertModal open={isShowing} onClose={setIsShowing} text={{title: "Credentials already in use", content: "Username or email already in use! Please try something different"}}/>
        </>
    );
}

export default Register;