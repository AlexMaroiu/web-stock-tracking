import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from "react";

function Statistics (props: {text: string, data: string | number, title?: any}) {
    const [open, setOpen] = useState(false);
    // const [timeout, setTimeout1] = useState(null);
    const handleTooltipClose = () => {
        setOpen(false);
    }

    const handleTooltipOpen = () => {
        setOpen(true);
    }

    // used for onClick event
    // const handleTooltipOpen = () => {
    //     clearTimeout(timeout);
    //     setOpen(prev => {
    //         if(!prev){
    //             setTimeout1(setTimeout(() => {
    //                 setOpen(false);
    //             }, 10000))
    //         }
    //         return !prev
    //     });
    // }

    return(
        <div style={{display: "flex", flexDirection: "row"}}>
            <p>{props.text} </p>
            {props.title && <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip title={props.title}
                    arrow
                    placement="top-start" 
                    open={open}
                    onClose={handleTooltipClose}
                    PopperProps={{
                        disablePortal: true,
                    }}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener>
                    <IconButton onMouseEnter={handleTooltipOpen} onMouseLeave={handleTooltipClose} style={{height: "1rem", width: "1rem", alignSelf:"center", margin:"0.5rem"}}><HelpOutlineIcon/></IconButton>
                </Tooltip>
            </ClickAwayListener>}
            <p style={{marginLeft: "0.5rem"}}>{props.data}</p>
            
        </div>
    );
}

export default Statistics;