import { Typography, Button, Stack, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LocalPlay() {

    return (
        <>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>
                Play locally!
            </Typography>


            <Stack sx={{ margin: 5 }}>
                <ButtonGroup variant='contained' component={Stack}
                    sx={{
                        gap: '16px'
                    }}>
                    <Button
                        component={Link}
                        to={'/local/tic-tac-toe'}
                    >
                        Play Tic tac toe
                    </Button>
                    <Button
                        component={Link}
                        to={'/local/connect-4'}
                    >
                        Play Connect 4
                    </Button>
                </ButtonGroup>
            </Stack>

            <Typography sx={{ textAlign: 'center' }}>
                Local games do not affect your stats
            </Typography>
        </>
    )
}