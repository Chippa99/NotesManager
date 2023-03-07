import NoteView from "./NoteView";

const UpdateNoteDialog = ({ open, setOpen, defaultValue = {} , getNotes}) => {
    function handleUpdate(value) {
        fetch('api/note/update', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: value.id,
                subject: value.subject,
                body: value.body,
                imageLink: value?.imageLink
            })
        }).then(response => {
            if (response.status === 200) {
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

    return <NoteView open={open} setOpen={setOpen} note={defaultValue} handleAction={handleUpdate} label="Note Updating" />
}
export default UpdateNoteDialog