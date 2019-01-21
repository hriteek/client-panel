import React from "react";
import Clients from "../clients/Clients";
import SideBar from "./SideBar";

const DashBoard = () => {
  return (
    <div className="row">
      <div className="col col-md-10">
        <Clients />
      </div>
      <div className="col col-md-2">
        <SideBar />
      </div>
    </div>
  );
};
export default DashBoard;
