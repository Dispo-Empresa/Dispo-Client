import * as Mui from "@mui/material";

function TextField(props) {

    return (
        <Mui.TextField 
            value={props}
            variant="outlined"
            label={props.label}
            type={props.type}
            onChange={props.onChange}
            style={{
                width: props.width ?? 320
            }}
        />
    );
}

export default TextField