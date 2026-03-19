import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

export default function ChallengesTable({ sent, challenges, onAccept, onDecline }) {

    return (
        <>
            <Typography variant="h5" marginBottom={3} marginTop={3}>{sent ? "Sent" : "Received"} Challenges</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{sent ? "Receiver" : "Sender"}</TableCell>
                        <TableCell align="center">Game Type</TableCell>
                        <TableCell align="center">Sent At</TableCell>
                        <TableCell width={2} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {challenges.map((challenge) => (
                        <TableRow key={challenge.id}>
                            <TableCell align="center">{sent ? challenge.receiverName : challenge.senderName}</TableCell>
                            <TableCell align="center">{challenge.gameName}</TableCell>
                            <TableCell align="center">{challenge.createdAt}</TableCell>
                            <TableCell align="center">
                                <Stack direction="row" spacing={1}>
                                    {sent ?
                                        <Button onClick={() => onDecline(challenge.id)} variant="contained" color="error" size="small">
                                            Remove
                                        </Button>
                                        :
                                        <>
                                            <Button onClick={() => onAccept(challenge.id)} variant="outlined" size="small">
                                                Accept
                                            </Button>
                                            <Button onClick={() => onDecline(challenge.id)} variant="contained" color="error" size="small">
                                                Decline
                                            </Button>
                                        </>
                                    }

                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )


}