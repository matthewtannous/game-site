import { Paper } from "@mui/material";
import LoadingWheel from "../../../components/ui/LoadingWheel";

import { useAuth } from "../../../store/hooks/useAuth";

import GamesTable from "../components/GamesTable";

import { useGetAllGamesOneUserQuery } from "../../../store/slices/apiSlice";

export default function GameList() {
    const { user } = useAuth();

    const { data: games = [], isLoading } = useGetAllGamesOneUserQuery(user.id);

    let content;
    if (isLoading) {
        content = <LoadingWheel />
    } else {
        content =
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
    }

    return (
        <>
            {content}
        </>
    )
}