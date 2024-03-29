import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import { useState } from "react";

import "./styles.css";

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(1);

  const handleClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div>
      <MDBTabs className="mb-3 container-tabs">
        {tabs.map((tab) => (
          <MDBTabsItem>
            <MDBTabsLink
              key={tab.id}
              active={tab.id === activeTab}
              onClick={() => handleClick(tab.id)}
            >
              {tab.title}
            </MDBTabsLink>
          </MDBTabsItem>
        ))}
      </MDBTabs>
      <MDBTabsContent>
        {tabs.map((tab) => (
          <MDBTabsPane show={tab.id === activeTab}>
            <div className="content-tabs">{tab.content}</div>
          </MDBTabsPane>
        ))}
      </MDBTabsContent>
    </div>
  );
}

export default Tabs;
