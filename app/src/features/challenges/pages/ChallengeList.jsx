import { Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getChallenges, deleteChallenge } from "../services/challenges.service";
export default function ChallengeList() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        loadChallenges();
    }, []);

    async function loadChallenges() {
        setChallenges(await getChallenges());
    }

    async function remove(id) {
        deleteChallenge(id);
        loadChallenges();
    }
    return (
        <Paper>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5">Challenges</Typography>
                <Button component={Link} to="/challenges/new" variant="contained">
                    Challenge someone!
                </Button>
            </Stack>

            <Table>
                <TableHead>
                    <TableRow>
                        {/* <TableCell align="center">ID</TableCell> */}
                        <TableCell align="center">Sender</TableCell>
                        <TableCell align="center">Receiver</TableCell>
                        <TableCell align="center">Game Type</TableCell>
                        <TableCell align="center">Sent At</TableCell>
                        <TableCell width={2} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {challenges.map((challenge) => (
                        <TableRow key={challenge.id}>
                            {/* <TableCell align="center">{challenge.id}</TableCell> */}
                            <TableCell align="center">{challenge.senderName}</TableCell>
                            <TableCell align="center">{challenge.receiverName}</TableCell>
                            <TableCell align="center">{challenge.gameName}</TableCell>
                            <TableCell align="center">{challenge.createdAt}</TableCell>
                            <TableCell align="center">
                                <Stack direction="row" spacing={1}>
                                    <Button component={Link} to={`/challenges/${challenge.id}/accept`} variant="outlined" size="small">
                                        Accept
                                    </Button>
                                    <Button onClick={() => remove(challenge.id)} variant="contained" color="error" size="small">
                                        Decline
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}