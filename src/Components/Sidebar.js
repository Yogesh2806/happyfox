import { useState, useEffect } from "react";
import TreeComp from "./Tree";

const Sidebar = () => {
  const [apiData, setApiData] = useState([]);
  const [record, setRecord] = useState([]);
  const [treeRecord, setTreeRecord] = useState([]);
  const [clickhigh, setClickHigh] = useState("");

  useEffect(() => {
    let isMounted = true;
    const apiCall = async () => {
      try {
        const response = await fetch("/api/treeData");
        const data = await response.json();
        setApiData(data);
        setRecord(data);
        if (isMounted) {
          setApiData(data);
          setRecord(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    apiCall();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectData = ["All", ...apiData.map((item) => item.team)];

  const onSelectChange = (e) => {
    const value = e.target.value;
    setRecord(
      value === "All"
        ? apiData
        : apiData.filter((item) =>
            item?.team?.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const searchFilter = (e) => {
    const value = e.target.value;
    setRecord(
      apiData.filter(
        (item) =>
          item?.designation?.toLowerCase().includes(value.toLowerCase()) ||
          item?.name?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const cardHandler = (item) => {
    setTreeRecord(item);
    setClickHigh(item.id);
  };
  return (
    <div className="main-container">
      <div className="left-container">
        <h1>Employes</h1>
        <div className="search-container">
          <label for="search-bar">Search</label>
          <input
            id="search-bar"
            type="search"
            onChange={searchFilter}
            placeholder="Search for Name and Designation"
          />
        </div>
        <div className="select-container">
          <label for="team-select">Teams</label>

          <select name="teams" id="team-select" onChange={onSelectChange}>
            {selectData.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          {record.map((item) => (
            <div
              className="card-container"
              onClick={() => cardHandler(item)}
              style={{
                backgroundColor:
                  clickhigh === item.id ? "rgb(230, 230, 230)" : "",
              }}
            >
              <p>Name: {item.name}</p>
              <p>Designation: {item.designation}</p>
              <p>Team: {item.team}</p>
            </div>
          ))}
        </div>
      </div>
      <TreeComp treeRecord={treeRecord} />
    </div>
  );
};

export default Sidebar;
