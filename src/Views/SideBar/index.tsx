import React from "react";
import './style.css';
import Menu from "../../Components/Menu";
import  { MenuData } from '../../Protype/menu'

export default function SideBar(props: any) {
  // mock data
  const data: Array<MenuData> = require("./data.json");

  return (
    <>
      <div className="sidebar-wrap">
        <header className="header">
          <div>Name</div>
          <div>Size</div>
        </header>
        <div className="content">
          {data?.map((item: MenuData) => {
            return (
              <div key={item.name}>
                <Menu data={item} icon="" />
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}
