import "../App.scss";
import * as React from "react";

import OrgTreeComponent, { useTree } from "react-drag-hierarchy-tree";

const TreeComp = ({ treeRecord }) => {
  const { treeRef } = useTree();
  const { id, name } = treeRecord;
  const data = {
    id: 1,
    label: "CEO",
    children: [
      {
        id: 2,
        label: "Administrative",
        children: [
          {
            id: 3,
            label: "Director",
            children: [],
          },
        ],
      },
      {
        id: 4,
        label: "Finances",
        children: [
          {
            id: 5,
            label: "Seller",
            children: [],
          },
        ],
      },
    ],
  };

  const [userData, setUserData] = React.useState(data);

  React.useEffect(() => {
    data && setUserData(data);
  }, [treeRecord]);

  return (
    <div className="right-container">
      <OrgTreeComponent data={userData} ref={treeRef} vertical />
    </div>
  );
};

export default TreeComp;
