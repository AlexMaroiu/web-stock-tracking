import { Button } from "@mui/material";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import styles from "./UserNavigation.module.css";
import { useState } from "react";

function UserNavigation() {
    const navigate = useNavigate();
    const auth = useAuthUser();

    const isAuthenticated = useIsAuthenticated();

    const signOut = useSignOut();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!isAuthenticated())
        return (
            <>
                <Button
                    color="inherit"
                    className={styles.button}
                    onClick={() => navigate("/login")}
                >
                    Log-in
                </Button>
            </>
        );
    else
        return (
            <>
                <Button
                    id="menu-button"
                    color="inherit"
                    className={styles.button}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    {auth().username}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "menu-button",
                    }}
                >
                    {/* //todo */}
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                </Menu>
            </>
        );
}

export default UserNavigation;
