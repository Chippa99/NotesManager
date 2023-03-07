import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";

const ViewNoteDialog = ({open, setOpen, value}) => {
    return <>
    <Dialog
        onClose={() => setOpen(false)}
        open={open}
        fullWidth
        maxWidth="sm"
    >
        <DialogTitle>
            {value.subject}
        </DialogTitle>
        <DialogContent dividers>
            {value.imageLink && <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "100%",

                }}
                alt="Incorrect image link"
                src={value.imageLink}
            />}
            <TextField disabled value={value.body} fullWidth multiline minRows={10}/>
            <Typography variant="caption">
                {`Created ${value.createDatetime}`}
            </Typography>

    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpen(false)}>
            Cancel
        </Button>
    </DialogActions>
    </Dialog>
</>
}
export default ViewNoteDialog