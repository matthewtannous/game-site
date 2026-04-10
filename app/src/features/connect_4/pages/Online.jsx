import { useParams } from 'react-router-dom';

export default function OnlineConnect4() {

    const { id } = useParams();

    return (
        <>
            online connect 4 test {id}
        </>
    )
}