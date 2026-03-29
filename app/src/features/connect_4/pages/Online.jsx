import { useParams } from 'react-router-dom';
import { getOneOngoingDetailed } from '../../ongoing/services/ongoing.service';

export default function OnlineConnect4() {

    const { id } = useParams();

    return (
        <>
            online connect 4 test {id}
        </>
    )
}