import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import {noteSchema} from "../../schemas/NoteSchema";
import {yupResolver} from "@hookform/resolvers/yup"

const NoteView = ({note, open, setOpen, handleAction, label}) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(noteSchema),
        defaultValues: note
    })

    return <>
        <Dialog
            onClose={() => setOpen(false)}
            open={open}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {label}
            </DialogTitle>
            <form onSubmit={handleSubmit(handleAction)}>
                <DialogContent dividers>
                    <Grid container gap={2} justifyContent="space-between">
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       label="Subject"
                                       required
                                       error={!!errors.subject}
                                       helperText={errors.subject?.message}
                                       {...register("subject")}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                       label="Image Link"
                                       error={!!errors.imageLink}
                                       helperText={errors.imageLink?.message}
                                       {...register("imageLink")}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                multiline
                                minRows={10}
                                label="Text"
                                error={!!errors.body}
                                helperText={errors.body?.message}
                                {...register("body")}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Done
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    </>
}
export default NoteView