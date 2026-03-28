import { Button } from "@mui/material";

export default function PlaceButton({ onButtonClick }) {
    return (
        <Button variant='outlined' sx={{
            height: '40px',
            width: '40px',
            transform: 'rotate(-45deg)',
            marginTop: '35px',
            marginLeft: '8px',
            marginRight: '8px',
        }}
            onClick={onButtonClick}
        >
            Place
        </Button>
    );
}