import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../store/hooks/useAuth";

import ChallengesTable from "../components/ChallengesTable";

import { getReceivedChallenges, getSentChallenges, deleteChallenge, acceptChallenge } from "../services/challenges.service";

export default function ChallengeList() {
    const { user } = useAuth();

    const [receivedChallenges, setReceivedChallenges] = useState([]);
    const [sentChallenges, setSentChallenges] = useState([]);

    async function loadChallenges() {
        // setReceivedChallenges(await getChallenges());
        setReceivedChallenges(await getReceivedChallenges(user.id));
        setSentChallenges(await getSentChallenges(user.id));
    }

    useEffect(() => {
        if (!user?.id)
            return;
        loadChallenges();
    }, [user?.id]);


    async function remove(id) {
        setReceivedChallenges(prev => prev.filter(c => c.id !== id));
        setSentChallenges(prev => prev.filter(c => c.id !== id));

        deleteChallenge(id);

        // Reload after small delay (prevent fetching old data from database)
        // CHANGE WITH WEBSOCKETS !!!!!!!!
        setTimeout(function () {
            loadChallenges();
        }, 150);
    }

    async function accept(id) {
        setReceivedChallenges(prev => prev.filter(c => c.id !== id));
        setSentChallenges(prev => prev.filter(c => c.id !== id));

        acceptChallenge(id);

        // Reload after small delay (prevent fetching old data from database)
        // CHANGE WITH WEBSOCKETS !!!!!!!!
        setTimeout(function () {
            loadChallenges();
        }, 150);

    }
    return (
        <Paper>
            <Button component={Link} to="/challenges/new" variant="contained">
                Challenge someone!
            </Button>

            <ChallengesTable
                sent={false}
                challenges={receivedChallenges}
                onAccept={accept}
                onDecline={remove}
            />

            <ChallengesTable
                sent={true}
                challenges={sentChallenges}
                onAccept={accept}
                onDecline={remove}
            />
        </Paper>
    )
}