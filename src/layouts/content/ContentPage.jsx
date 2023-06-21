import { useState } from "react";
import { Card, CardContent } from "@material-ui/core";

import { COLORS } from "../../themes/colors";
import { CollapseButton } from "../../components/ui/buttons/icons/IconButton";

import "./styles.css";

function ContentPage(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Card
      style={{
        height: collapsed && "75px",
        minHeight: !collapsed && "350px",
        marginBottom: "32px",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0px 0.2px 0px",
        border: "1px solid #ffff",
      }}
    >
      <CardContent>
        <div className="card-content">
          <div>
            <label
              className="card-title"
              style={{
                color: COLORS.SecondColor,
              }}
            >
              {props.title}
            </label>
          </div>
          <div className="card-buttons">
            {!collapsed && props.buttons}
            <CollapseButton
              collapsed={collapsed}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
        {!collapsed && <hr />}
        <div className="content-children">{props.children}</div>
      </CardContent>
    </Card>
  );
}

export default ContentPage;
