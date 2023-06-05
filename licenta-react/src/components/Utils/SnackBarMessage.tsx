import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function SnackBarMessage (props: {message: string, setMessage: (msg: string) => void}) {
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => props.setMessage(null)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return(
        <>
            <Snackbar
                    open={props.message ? true : false}
                    autoHideDuration={4000}
                    onClose={() => props.setMessage(null)}
                    message={props.message}
                    action={action}
                />
        </>
    );
}

export default SnackBarMessage;