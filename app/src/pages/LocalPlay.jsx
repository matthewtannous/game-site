import { Typography, Button, Stack, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';

import { Game } from '../constants';

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
                    }}
                >
                    {
                        Object.entries(Game).map(game => (
                            <Button
                                key={game[0]}
                                component={Link}
                                to={`/local/${game[0].replace(' ', '-')}`}
                            >
                                Play {game[1]}
                            </Button>

                        ))
                    }
                </ButtonGroup>
            </Stack>

            <Typography sx={{ textAlign: 'center' }}>
                Local games do not affect your stats
            </Typography>
        </>
    )
}