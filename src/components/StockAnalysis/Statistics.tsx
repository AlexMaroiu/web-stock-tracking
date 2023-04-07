import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";

import styles from "./Statistics.module.css";
import StatisticsProps from "../../models/StatisticsProps";

function Statistics(props: StatisticsProps) {
    const [open, setOpen] = useState(false);
    // const [timeout, setTimeout1] = useState(null);
    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

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

    return (
        <div className={styles.container}>
            <p>{props.text} </p>
            {props.tooltip && (
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                        title={props.tooltip}
                        arrow
                        placement="top-start"
                        open={open}
                        onClose={handleTooltipClose}
                        PopperProps={{
                            disablePortal: true,
                        }}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                    >
                        <div className={styles.link}>
                            <HashLink smooth to={`/docs${props.link}`}>
                                <IconButton
                                    onMouseEnter={handleTooltipOpen}
                                    onMouseLeave={handleTooltipClose}
                                    className={styles.btn}
                                >
                                    <HelpOutlineIcon />
                                </IconButton>
                            </HashLink>
                        </div>
                    </Tooltip>
                </ClickAwayListener>
            )}
            <p style={{ marginLeft: "0.5rem" }}>{props.data}</p>
        </div>
    );
}

export default Statistics;
