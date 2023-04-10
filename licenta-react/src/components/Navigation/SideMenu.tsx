import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/system";
import Drawer from "@mui/material/Drawer";

import { listData } from "./SideMenuItems";

function SideMenu(props: {
    toggleDrawer: (
        b: boolean
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    openDrawer: boolean;
}) {
    const navigate = useNavigate();

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={props.toggleDrawer(false)}
            onKeyDown={props.toggleDrawer(false)}
        >
            <List>
                {listData.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(item.navigation)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>{/* //TODO: de completat */}</List>
        </Box>
    );

    return (
        <>
            <Drawer
                anchor={"left"}
                open={props.openDrawer}
                onClose={props.toggleDrawer(false)}
            >
                {list}
            </Drawer>
        </>
    );
}

export default SideMenu;
