import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { formatDistanceToNow } from 'date-fns';

import { Link } from "react-router-dom";

export default function ChallengesTable({ ongoingGames, username }) {
    return (
        <>
            <Typography variant="h5" marginBottom={3} marginTop={3} align="center"> Ongoing games</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width={200}>Opponent</TableCell>
                        <TableCell align="center" width={200}>Game Type</TableCell>
                        <TableCell align="center" width={300}>Time of Last Move</TableCell>
                        <TableCell align="center" width={300}>Game State</TableCell>
                        <TableCell align="center" width={200} >Check Game</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {ongoingGames.map((game) => (
                        <TableRow key={game.id}>
                            <TableCell align="center">{game.player1Name === username ? game.player2Name : game.player1Name}</TableCell>
                            <TableCell align="center">{game.gameName}</TableCell>
                            <TableCell align="center">{formatDistanceToNow(game.lastMovePlayedAt, { addSuffix: true, includeSeconds: true })}</TableCell>
                            <TableCell align="center">{game.state}</TableCell>
                            <TableCell align="center">
                                <Button
                                    color="secondary"
                                    LinkComponent={Link}
                                    to={`/ongoing/${game.gameName.replace(' ', '-').toLowerCase()}/${game.id}`}
                                    variant="contained"
                                    size="small"
                                >
                                    GO
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}