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
        <DefaultTypography variant="h4" text={props.title} color={COLORS.SecondColor} />
      </Box>
      <div>
        { props.AlertMessage && props.AlertMessage.map(item => <AlertMessagePanel type={item.type} description={item.description} />) }
      </div>
      <div className="content" style={{ width: props.cardWidth ?? "1400px", height: props.cardHeight }}>
        <Card>
          <CardContent className="content-children">
            {props.children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}