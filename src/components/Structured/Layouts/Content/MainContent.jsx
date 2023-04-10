import { Box } from "@mui/system";
import { DefaultTypography } from "../../../Basic/Labels/Typography"
import { AlertMessagePanel } from "../../Notifications/MessagePanel/AlertMessagePanel"
import { COLORS } from "../../../../config/defaultColors"
import { Card, CardContent } from '@material-ui/core';

import "./styles.css"

export default function MainContent(props) {

  return(
    <div className="container">
      <Box className="title">
        <DefaultTypography variant="h5" text={props.title} color={COLORS.SecondColor} />
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