import { useParams } from 'react-router-dom';

export default function OnlineTicTacToe() {

    const { id } = useParams();

    return (
        <>
            online tic tac toe test {id}
        </>
    )
}