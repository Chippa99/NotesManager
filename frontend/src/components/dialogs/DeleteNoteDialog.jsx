import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

const DeleteNoteDialog = ({ open, setOpen, value, getNotes, setPage}) => {
    function handleDelete() {
        fetch(`api/note/delete/${value?.id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                setPage(0)
                getNotes(0, 5)
                setOpen(false)
            } else {
                throw new Error('Failed to get notes')
            }
        }).catch(error => {
            setOpen(false)
            console.error(error)
        })
    }

    return <Dialog
        onClose={() => setOpen(false)}
        open={open}
        fullWidth
        maxWidth="sm"
    >
        <DialogTitle>
             Note Deleting
        </DialogTitle>
        <DialogContent dividers>
            {`Do you really want to delete note: '${value?.subject}' ?`}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}>
                Cancel
            </Button>
            <Button onClick={handleDelete}>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
}

export default DeleteNoteDialog