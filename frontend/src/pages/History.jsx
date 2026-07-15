import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Chip,
    CircularProgress,
    Box
} from "@mui/material";

import Layout from "../components/Layout";

import api from "../services/api";

function History() {

    const [interactions, setInteractions] = useState([]);

    const [filtered, setFiltered] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadInteractions();

    }, []);

    useEffect(() => {

        const data = interactions.filter((item) => {

            return (
                item.doctor_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.hospital
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        });

        setFiltered(data);

    }, [search, interactions]);

    const loadInteractions = async () => {

        try {

            const response = await api.get("/interactions");

            setInteractions(response.data);

            setFiltered(response.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (

       <>

            <Typography
                variant="h4"
                sx={{
                    mb:3,
                    fontWeight:700
                }}
            >
                Interaction History
            </Typography>

            <TextField
                fullWidth
                label="Search Doctor / Hospital"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                sx={{
                    mb:3
                }}
            />

            <Paper
                sx={{
                    borderRadius:3,
                    overflow:"hidden"
                }}
            >

                {
                    loading ?

                    <Box
                        sx={{
                            display:"flex",
                            justifyContent:"center",
                            py:5
                        }}
                    >

                        <CircularProgress/>

                    </Box>

                    :

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Doctor
                                </TableCell>

                                <TableCell>
                                    Hospital
                                </TableCell>

                                <TableCell>
                                    Date
                                </TableCell>

                                <TableCell>
                                    Summary
                                </TableCell>

                                <TableCell>
                                    Sentiment
                                </TableCell>

                                <TableCell>
                                    Follow Up
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {
                                filtered.map((item)=>(

                                    <TableRow
                                        key={item.id}
                                        hover
                                    >

                                        <TableCell>

                                            {item.doctor_name}

                                        </TableCell>

                                        <TableCell>

                                            {item.hospital}

                                        </TableCell>

                                        <TableCell>

                                            {item.interaction_date}

                                        </TableCell>

                                        <TableCell>

                                            {item.summary}

                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={item.sentiment}
                                                color={
                                                    item.sentiment==="positive"
                                                    ?
                                                    "success"
                                                    :
                                                    "default"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>

                                            {item.follow_up}

                                        </TableCell>

                                    </TableRow>

                                ))
                            }

                        </TableBody>

                    </Table>

                }

            </Paper>

   </>

    );

}

export default History;