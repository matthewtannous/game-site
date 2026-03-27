import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../store/hooks/useAuth";

import OngoingTable from "../components/OngoingTable";
import { getOneOngoingDetailedNoMoves } from "../services/ongoing.service";

export default function ChallengeList() {
    const { user } = useAuth();

    const [ongoing, setOngoing] = useState([]);

    async function loadOngoing() {
        setOngoing(await getOneOngoingDetailedNoMoves(user.id)); // TEMPORARY
    }

    useEffect(() => {
        if (!user?.id)
            return;
        loadOngoing();
    }, [user?.id]);

    return (
        <Paper>
            <OngoingTable
                ongoingGames={ongoing}
                username={user.username}
            />
        </Paper>
    )
}