import {
    IconButton,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import React, {useEffect, useState} from "react";
import DeleteNoteDialog from "../dialogs/DeleteNoteDialog";
import UpdateNoteDialog from "../dialogs/UpdateNoteDialog";
import ViewNoteDialog from "../dialogs/ViewNoteDialog";
import Box from '@mui/material/Box';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {useTheme} from '@mui/material/styles';

const NoteTable = ({rows, totalRowsCount, getNotes}) => {
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.info.dark,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const TablePaginationActions = (props) => {
        const theme = useTheme();
        const {count, page, rowsPerPage, onPageChange} = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <Box sx={{flexShrink: 0, ml: 2.5}}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                </IconButton>
            </Box>
        );
    }

    const [openUpdate, setOpenUpdate] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    useEffect(() => {
        getNotes(page, rowsPerPage)
    }, [page, rowsPerPage])

    return <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="right">id</StyledTableCell>
                        <StyledTableCell align="right">Subject</StyledTableCell>
                        <StyledTableCell align="right">Creation Date</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow>
                            <StyledTableCell align="right">{row.id}</StyledTableCell>
                            <StyledTableCell align="right">{row.subject}</StyledTableCell>
                            <StyledTableCell align="right">{row.createDatetime}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Stack direction="row">
                                    <IconButton onClick={() => {
                                        setSelectedRow(row)
                                        setOpenView(true)
                                    }}>
                                        <PageviewIcon color="primary"/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setSelectedRow(row)
                                        setOpenUpdate(true)
                                    }}>
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setSelectedRow(row)
                                        setOpenDelete(true)
                                    }}>
                                        <DeleteIcon color="primary"/>
                                    </IconButton>
                                </Stack>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            count={totalRowsCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={(e, v) => setPage(v)}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        {openDelete && <DeleteNoteDialog open={openDelete} setOpen={setOpenDelete} value={selectedRow} getNotes={getNotes} setPage={setPage} />}
        {openUpdate && <UpdateNoteDialog open={openUpdate} setOpen={setOpenUpdate} defaultValue={selectedRow} getNotes={getNotes} />}
        {openView && <ViewNoteDialog open={openView} setOpen={setOpenView} value={selectedRow} />}
    </>
}
export default NoteTable