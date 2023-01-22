import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

function AlertModal(props: { open: boolean; onClose: (b: boolean) => void }) {
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal
                open={props.open}
                onClose={() => props.onClose(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Stock not found
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        The stock you searched was not found, please try another
                        symbol or name.
                    </Typography>
                    <Button
                        sx={{ marginTop: "1rem" }}
                        onClick={() => props.onClose(false)}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default AlertModal;
