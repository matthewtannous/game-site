import { Button } from "@mui/material";

export default function SurrenderButton({ onClick, text }) {

    return (
        <Button
            variant="contained"
            color="error"

            onClick={onClick}
            sx={{
                marginTop: '40px',
                marginLeft: '30px',
                height: '75px',
                width: '100px',
            }}
        >
            {text}
        </Button>
    )
}