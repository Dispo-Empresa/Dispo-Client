import { Card } from "@material-ui/core";
import { Panel } from "primereact/panel";
import { CollapseButton } from "components/ui/buttons/icons/IconButton";

import "./styles.css";

function ContentPage(props) {
  const template = (options) => {
    return (
      <div className="card-content">
        <label className="card-title">{props.title}</label>
        <div className="card-buttons">
          {props.buttons}
          <CollapseButton
            collapsed={options.collapsed}
            onClick={options.onTogglerClick}
          />
        </div>
      </div>
    );
  };

  return (
    <Card
      className={props.className}
      id={props.id}
      style={{
        marginBottom: "30px",
        borderRadius: "10px",
        maxWidth: "100%",
      }}
    >
      <Panel
        id={props.id}
        headerTemplate={template}
        toggleable
        collapsed={props.defaultCollapsed}
      >
        <hr style={{ marginTop: "-20px" }} />
        <div className="content-page-children">{props.children}</div>
      </Panel>
    </Card>
  );
}

export default ContentPage;
