import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead} from "@mui/material";
import {MoveRow} from "./MoveRow";


export const Moves = () => {
    const { status, data} = useQuery(['moves'], async () => {
        const res = await axios.get('https://staging.pokeapi.co/api/v2/move/?limit=850')
        console.log("all pokemon loaded")
        return res.data
    })


    console.log( status )

    let result = <>Loading</>
    if (status === 'success') {
        console.log("Moves are loaded.")
        const moves = data
        result = moves.results.map((move) => <MoveRow name={move.name} url={move.url}></MoveRow>)
    }


    return <TableContainer component={Paper}>
        <Table size={'small'} aria-label="collapsible table">
            <TableHead>
                <TableCell></TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Power</TableCell>
                <TableCell>Damage Class</TableCell>
                <TableCell>Accuracy</TableCell>
                <TableCell>PP</TableCell>
            </TableHead>
            <TableBody>
                {result}
            </TableBody>
        </Table>

    </TableContainer>
}