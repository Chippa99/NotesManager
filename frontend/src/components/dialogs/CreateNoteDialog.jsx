import NoteView from "./NoteView";

const CreateNoteDialog = ({open, setOpen, handleChangePage, getNotes}) => {
    function handleCreate(value) {
        fetch('api/note/save', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(value)
        }).then(response => {
            if (response.status === 200) {
                getNotes(0, 5)
                handleChangePage(0)
                setOpen(false)
            } else {
                throw new Error('Failed to get notes')
            }
        }).catch(error => {
            setOpen(false)
            console.error(error)
        })
    }

    return <NoteView open={open} setOpen={setOpen} handleAction={handleCreate} label="Note Creation"/>
}
export default CreateNoteDialog