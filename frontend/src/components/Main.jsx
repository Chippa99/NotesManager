import {
    AppBar,
    Container,
    Stack,
    Typography,
    Button,
    Grid, TextField
} from "@mui/material";
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import React, {useEffect, useState} from "react";
import CreateNoteDialog from "./dialogs/CreateNoteDialog";
import NoteTable from "./Tables/NoteTable";

const Main = () => {
    const [openCreate, setOpenCreate] = useState(false)
    const [rows, setRows] = useState([])
    const [totalRowsCount, setTotalRowsCount] = useState(0)
    const [max, setMax] = useState(0)
    const [days, setDays] = useState(0)
    const [average, setAverage] = useState(0)

    useEffect(() => {
        getMax()
        getDays()
        getAverage()
    }, [rows])

    function getNotes(page, rowsPerPage) {
        fetch(`api/notes/page?${new URLSearchParams({
            'offset': page,
            'limit': rowsPerPage
        })}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error('Failed to get notes')
            }
        }).then(result => {
            setTotalRowsCount(result.totalElements)
            const parsedResult = result.content.map(note => {
                note.createDatetime = new Date(note.createDatetime).toLocaleDateString("en-US")
                return note
            })
            setRows(parsedResult)
        }).catch(error => {
            console.error(error)
        })
    }

    function getMax() {
        fetch(`api/notes/max`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error('Failed to get notes')
            }
        }).then(result => {
            setMax(result)
        }).catch(error => {
            console.error(error)
        })
    }

    function getAverage() {
        fetch(`api/notes/average`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error('Failed to get notes')
            }
        }).then(result => {
            setAverage(result)
        }).catch(error => {
            console.error(error)
        })
    }

    function getDays() {
        fetch(`api/notes/days`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error('Failed to get notes')
            }
        }).then(result => {
            setDays(result)
        }).catch(error => {
            console.error(error)
        })
    }

    return <>
        <Stack direction="column"
               justifyContent="center"
               alignItems="center">
            <AppBar position="static">
                <Stack direction="row"
                       alignItems="center"
                       spacing={2}
                       margin={1}
                       sx={{paddingLeft: 10}}>
                    <EventNoteOutlinedIcon fontSize="large"/>
                    <Typography variant="h6"> Notes Manager </Typography>
                </Stack>
            </AppBar>
        </Stack>
        <Container fixed style={{height: 500, paddingTop: 15}}>
            <Grid container gap={1}  alignItems="center">
                <Button variant="contained"
                        sx={{ padding: 2}}
                        onClick={() => setOpenCreate(true)}>
                    Create note
                </Button>
                <Grid item>
                    <TextField disabled label="Average note size" value={average}/>
                </Grid>
                <Grid item>
                    <TextField disabled label="Max note size" value={max}/>
                </Grid>
                <Grid item>
                    <TextField disabled label="Days after first note" value={days}/>
                </Grid>
                <NoteTable rows={rows} totalRowsCount={totalRowsCount} getNotes={getNotes}/>
            </Grid>
        </Container>
        {openCreate && <CreateNoteDialog open={openCreate} setOpen={setOpenCreate} getNotes={getNotes}/>}
    </>
}
export default Main