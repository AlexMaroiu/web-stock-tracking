import { AppBar, Button, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import SideMenu from "./SideMenu";
import { useState } from "react";

interface Props {
    title: string,
    children?: any,
}
  
function HideOnScroll(props: Props) {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
}


function Navigation(props: Props) {
    const [openDrawer, setOpenDrawer] = useState(false);
    
    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
        
            setOpenDrawer( open );
        };

    return (
        <>
            <SideMenu toggleDrawer={toggleDrawer} openDrawer={openDrawer}></SideMenu>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography sx={{ flexGrow: 1 }}>{props.title}</Typography>
                        <Box sx={{ justifyContent: "center", width: "100%" }}>
                            {props.children}
                        </Box>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}

export default Navigation;
