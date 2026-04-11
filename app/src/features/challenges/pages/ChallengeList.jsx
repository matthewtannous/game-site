import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../store/hooks/useAuth";

import ChallengesTable from "../components/ChallengesTable";

// import { getReceivedChallenges, getSentChallenges, deleteChallenge, acceptChallenge } from "../services/challenges.service";
import {
    useGetReceivedChallengesQuery,
    useGetSentChallengesQuery,
    useDeleteChallengeMutation,
    useAcceptChallengeMutation,
} from "../../../store/slices/apiChallengeSlice";
import LoadingWheel from "../../../components/ui/LoadingWheel";

export default function ChallengeList() {
    const { user } = useAuth();

    const { data: receivedChallenges, isLoading: receivedLoading } = useGetReceivedChallengesQuery(user.id);
    const { data: sentChallenges, isLoading: sentLoading } = useGetSentChallengesQuery(user.id);
    const [deleteChallenge] = useDeleteChallengeMutation();
    const [acceptChallenge] = useAcceptChallengeMutation();

    // async function loadChallenges() {
    //     // setReceivedChallenges(await getChallenges());
    //     setReceivedChallenges(await getReceivedChallenges(user.id));
    //     setSentChallenges(await getSentChallenges(user.id));
    // }

    // useEffect(() => {
    //     if (!user?.id)
    //         return;
    //     loadChallenges();
    // }, [user?.id]);


    async function remove(id) {
        // // UI updates
        // setReceivedChallenges(prev => prev.filter(c => c.id !== id));
        // setSentChallenges(prev => prev.filter(c => c.id !== id));

        deleteChallenge(id);
    }

    async function accept(id) {
        // setReceivedChallenges(prev => prev.filter(c => c.id !== id));
        // setSentChallenges(prev => prev.filter(c => c.id !== id));

        acceptChallenge(id);
    }
    let content;
    if (receivedLoading || sentLoading) {
        content = <LoadingWheel />
    } else {
        content =
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
    }
    return (
        content
    )
}