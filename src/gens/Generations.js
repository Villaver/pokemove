import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead} from "@mui/material";
import { GenRow } from "./GenRow";

export const Generations = (props) => {
    
    const { status, data} = useQuery(['moves'], async () => {
        const res = await axios.get('https://staging.pokeapi.co/api/v2/generation')
        console.log("all generations loaded")
        return res.data
    })

    console.log( status )

    let result = <>Loading</>
    if (status === 'success') {
        console.log("generations are loaded.")
        const gens = data
        console.log({ gens })
        result = gens.results.map((gen) => <GenRow name={gen.name} url={gen.url}></GenRow>)
    }



    return (<TableContainer component={Paper}>
        <Table size={'small'} aria-label="collapsible table">
            <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Normal</TableCell>
                <TableCell>Fighting</TableCell>
                <TableCell>Flying</TableCell>
                <TableCell>Poison</TableCell>
                <TableCell>Ground</TableCell>
                <TableCell>Rock</TableCell>
                <TableCell>Bug</TableCell>
                <TableCell>Ghost</TableCell>
                <TableCell>Steel</TableCell>
                <TableCell>Fire</TableCell>
                <TableCell>Water</TableCell>
                <TableCell>Grass</TableCell>
                <TableCell>Electric</TableCell>
                <TableCell>Psychic</TableCell>
                <TableCell>Ice</TableCell>
                <TableCell>Dragon</TableCell>
                <TableCell>Dark</TableCell>
                <TableCell>Fairy</TableCell>
            </TableHead>
            <TableBody>
                {result}
            </TableBody>
        </Table>

    </TableContainer>)
}