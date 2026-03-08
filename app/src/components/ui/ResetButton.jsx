import { Button } from "@mui/material";

export default function ResetButton({ onClick }) {

    return (
        <Button
            variant="contained"
            color="error"

            onClick={onClick}
            sx={{
                marginLeft: '30px',
                height: '75px',
                width: '100px',
            }}
        >
            Reset
        </Button>
    )
}