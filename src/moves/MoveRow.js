import React from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const MoveRow = ({name, url}) => {

    const [open, setOpen] = React.useState(false);

    const { status, data} = useQuery(['move'+url], async () => {
        const res = await axios.get(url)
        return res.data
    })

    if (status !== 'success') {
        return (<>
            <TableRow key={url}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>Loading</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>Loading</TableCell>
                <TableCell>Loading</TableCell>
                <TableCell>Loading</TableCell>
                <TableCell>Loading</TableCell>
                <TableCell>Loading</TableCell>
            </TableRow>
        </>)
    }

    return (
        <>
            <TableRow key={url}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{data?.target?.name}</TableCell>
                <TableCell>{data?.name}</TableCell>
                <TableCell>{data?.type?.name}</TableCell>
                <TableCell>{data?.power}</TableCell>
                <TableCell>{data?.damage_class?.name}</TableCell>
                <TableCell>{data?.accuracy}</TableCell>
                <TableCell>{data?.pp}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ol>{data?.effect_entries.map(entry => <li>{entry.effect.replace('$effect_chance', data?.effect_chance)}</li>)}</ol>
                </Collapse>
                </TableCell>
            </TableRow>
        </>
    )

}