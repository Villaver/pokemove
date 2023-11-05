import React from 'react'
import { TableRow, TableCell} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const GenRow = ({name, url}) => {

    const { status, data} = useQuery(['gen'+url], async () => {
        const res = await axios.get(url)
        const pokemon_species = await Promise.all(res.data.pokemon_species.map(async species => {
            const response = await axios.get(species.url)
            return response.data
        }))
        console.log({pokemon_species})
        const pokemon = await Promise.all(pokemon_species.map(async pokemon => {
            const response = await axios.get(pokemon.varieties[0].pokemon.url)
            return response.data
        }))
        console.log({pokemon})
        return pokemon.reduce((acc, cur) => {
                cur.types.forEach(element => ++acc[element.type.name])
                return acc;
            }, 
            {
                normal: 0, 
                fighting: 0, 
                flying: 0, 
                ground: 0, 
                bug: 0, 
                ghost: 0, 
                steel: 0, 
                fire: 0, 
                grass: 0, 
                electric:0, 
                psychic:0, 
                ice:0, 
                dragon: 0, 
                dark: 0, 
                poison: 0, 
                water: 0,
                rock: 0, 
                fairy: 0
            })
    })

    if (status === 'success') {
        console.log(data)
    }



    return <>
        <TableRow key={url}>
            <TableCell>{name}</TableCell>
            <TableCell>{!!data ? data.normal : 'loading'}</TableCell>
            <TableCell>{!!data ? data.fighting : 'loading'}</TableCell>
            <TableCell>{!!data ? data.flying : 'loading'}</TableCell>
            <TableCell>{!!data ? data.poison : 'loading'}</TableCell>
            <TableCell>{!!data ? data.ground : 'loading'}</TableCell>
            <TableCell>{!!data ? data.rock : 'loading'}</TableCell>
            <TableCell>{!!data ? data.bug : 'loading'}</TableCell>
            <TableCell>{!!data ? data.ghost : 'loading'}</TableCell>
            <TableCell>{!!data ? data.steel : 'loading'}</TableCell>
            <TableCell>{!!data ? data.fire : 'loading'}</TableCell>
            <TableCell>{!!data ? data.water : 'loading'}</TableCell>
            <TableCell>{!!data ? data.grass : 'loading'}</TableCell>
            <TableCell>{!!data ? data.electric : 'loading'}</TableCell>
            <TableCell>{!!data ? data.psychic : 'loading'}</TableCell>
            <TableCell>{!!data ? data.ice : 'loading'}</TableCell>
            <TableCell>{!!data ? data.dragon : 'loading'}</TableCell>
            <TableCell>{!!data ? data.dark : 'loading'}</TableCell>
            <TableCell>{!!data ? data.fairy : 'loading'}</TableCell>
        </TableRow>
    </>
}