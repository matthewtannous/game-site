import { Button } from "@mui/material";

export default function PlaceButton({ onSquareClick }) {
    return (
        <Button variant='outlined' sx={{
            height: '40px',
            width: '40px',
            transform: 'rotate(-45deg)',
            marginTop: '35px',
            marginLeft: '8px',
            marginRight: '8px',
        }}
            onClick={onSquareClick}
        >
            Place
        </Button>
    );
}