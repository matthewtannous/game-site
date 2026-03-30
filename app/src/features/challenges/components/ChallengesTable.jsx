import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { formatDate } from 'date-fns';

export default function ChallengesTable({ sent, challenges, onAccept, onDecline }) {

    return (
        <>
            <Typography variant="h5" marginBottom={3} marginTop={3} align="center">{sent ? "Sent" : "Received"} Challenges</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width={200}>{sent ? "Receiver" : "Sender"}</TableCell>
                        <TableCell align="center" width={200}>Game Type</TableCell>
                        <TableCell align="center" width={300}>Sent At</TableCell>
                        <TableCell align="center" width={200} colSpan={2}>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {challenges.map((challenge) => (
                        <TableRow key={challenge.id}>
                            <TableCell align="center">{sent ? challenge.receiverName : challenge.senderName}</TableCell>
                            <TableCell align="center">{challenge.gameType}</TableCell>
                            <TableCell align="center">{formatDate(challenge.createdAt, "eeee d MMMM, u 'at' h:mm aaaa")}</TableCell>
                            <TableCell align="center">
                                {/* <Stack direction="row" spacing={1}>
                                    {sent ?
                                        <>
                                            <Button onClick={() => onDecline(challenge.id)} variant="contained" color="error" size="small">
                                                Remove
                                            </Button>
                                        </>
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
                                </Stack> */}
                                {sent ?
                                    <Button onClick={() => onDecline(challenge.id)} variant="contained" color="error" size="small">
                                        Remove
                                    </Button>
                                    :
                                    <ButtonGroup size="small" >
                                        <Button onClick={() => onAccept(challenge.id)} variant="outlined">
                                            Accept
                                        </Button>
                                        <Button onClick={() => onDecline(challenge.id)} variant="contained" color="error">
                                            Decline
                                        </Button>
                                    </ ButtonGroup>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )


}