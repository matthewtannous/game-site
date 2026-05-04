import { Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../store/hooks/useAuth';

import ChallengesTable from '../components/ChallengesTable';
import ErrorMessage from '../../../components/ui/ErrorMessage';

// import { getReceivedChallenges, getSentChallenges, deleteChallenge, acceptChallenge } from "../services/challenges.service";
import {
  useGetReceivedChallengesQuery,
  useGetSentChallengesQuery,
  useDeleteChallengeMutation,
  useAcceptChallengeMutation,
} from '../../../store/slices/apiChallengeSlice';
import LoadingWheel from '../../../components/ui/LoadingWheel';

export default function ChallengeList() {
  const { user } = useAuth();

  const {
    data: receivedChallenges,
    isLoading: receivedLoading,
    isError: receivedError,
    isSuccess: receivedIsSucces,
  } = useGetReceivedChallengesQuery(user.id);
  const {
    data: sentChallenges,
    isLoading: sentLoading,
    isError: sentError,
    isSuccess: sentIsSuccess,
  } = useGetSentChallengesQuery(user.id);
  const [deleteChallenge] = useDeleteChallengeMutation();
  const [acceptChallenge] = useAcceptChallengeMutation();

  let content;
  if (receivedLoading || sentLoading) {
    content = <LoadingWheel />;
  } else if (receivedError || sentError) {
    content = <ErrorMessage />;
  } else if (receivedIsSucces && sentIsSuccess) {
    content = (
      <Paper>
        <Button component={Link} to="/challenges/new" variant="contained">
          Challenge someone!
        </Button>

        <ChallengesTable
          sent={false}
          challenges={receivedChallenges}
          onAccept={acceptChallenge}
          onDecline={deleteChallenge}
        />

        <ChallengesTable
          sent={true}
          challenges={sentChallenges}
          onDecline={deleteChallenge}
        />
      </Paper>
    );
  }
  return content;
}
