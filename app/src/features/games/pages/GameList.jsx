import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

import { useAuth } from "../../../store/hooks/useAuth";

import GamesTable from "../components/GamesTable";
import { getAllOneUserDetailedNoMoves } from "../services/games.service";

export default function GameList() {
    const { user } = useAuth();

    const [games, setGames] = useState([]);

    async function loadGames() {
        setGames(await getAllOneUserDetailedNoMoves(user.id));
    }

    useEffect(() => {
        if (!user?.id)
            return;
        loadGames();
    }, [user?.id]);

    return (
        <Paper>
            <GamesTable
                games={games.filter((game) => game.state === 'ongoing')}
                username={user.username}
                finished={false}
            />

            <GamesTable
                games={games.filter((game) => game.state !== 'ongoing')}
                username={user.username}
                finished={true}
            />
        </Paper>
    )
}