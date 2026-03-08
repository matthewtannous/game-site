import { Button } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

export default function Square({ value }) {
    return (
        <Button variant='outlined' disabled sx={{
            height: '80px',
            width: '80px',
            background: '#f8f8f8',
            border: '1px solid #999',
            float: 'left',
            fontSize: '50px',
            lineHeight: '40px',
            // marginRight: '-1px'
            // marginTop: '5px'
            padding: 0,
            textAlign: 'center',
        }}
        >
            {/* {value ? value : "n"} */}
            {value ?
                <CircleIcon sx={{
                    color: value,
                    scale: 2.5
                }} /> : ''
            }

        </Button>
    );
}