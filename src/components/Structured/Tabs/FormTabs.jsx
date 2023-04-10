import React, { useState } from 'react';
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';

import "./styles.css"

export default function FormTabs({ tabs  }) {
  const [activeTab, setActiveTab] = useState(1);

  const handleClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div>
      <MDBTabs justify className='mb-3'> 
          {tabs.map((tab) => (
            <MDBTabsItem>
              <MDBTabsLink key={tab.id} active={tab.id === activeTab} onClick={() => handleClick(tab.id)}>
                {tab.title}
              </MDBTabsLink>
            </MDBTabsItem>
          ))}
        </MDBTabs>
        <MDBTabsContent>
          {tabs.map((tab) => (
            <MDBTabsPane show={tab.id === activeTab}>
              <div className="content-tabs">
                {tab.content}
              </div>
            </MDBTabsPane>
          ))}
        </MDBTabsContent>
    </div>
  );
}
