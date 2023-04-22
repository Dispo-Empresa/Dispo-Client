import { Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import { Card, CardContent } from '@material-ui/core';

import { AlertMessagePanel } from "../../components/structured/alert/panel/AlertMessagePanel"
import { COLORS } from "../../themes/colors"

import "./styles.css"

function Main(props) {

    return(
        <div className="container">
            <Box className="title">
                <Typography variant="h5" text={props.title} color={COLORS.SecondColor} />
            </Box>
            <div className="alert">
                { props.alertMessage && props.alertMessage.map(item => <AlertMessagePanel type={item.type} description={item.description} />) }
            </div>
            <div className="content" style={{ width: props.cardWidth ?? "1400px" }}>
                <Card style={{ borderRadius: "15px" }}>
                    <CardContent className="content-children">
                        {props.children}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Main;