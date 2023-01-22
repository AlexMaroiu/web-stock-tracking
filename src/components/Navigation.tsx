import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";

function Navigation(props: { children?: any }) {
    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}>Stocks</Typography>
                    <Box sx={{ justifyContent: "center", width: "100%" }}>
                        {props.children}
                    </Box>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navigation;
