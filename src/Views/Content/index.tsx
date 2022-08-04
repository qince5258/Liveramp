import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../Store/reducer";
import Term from "../../Components/Group";
import { TermVal } from "../../Protype/termPram";

const down = require("../../assets/Images/down.png");

export default function RightContent() {
  const { elementName, groups = [] } =
    useSelector((state: any) => state.myData) || {};
  const dispatch = useDispatch();

  const [dragEnter, setDragEnter] = useState(
    new Array(groups.length).fill(false)
  );

  // when drop done
  const drop = (e: any) => {
    e.preventDefault();
    dispatch(addGroup({ term: elementName }));
  };

  // each child group dragover, change the color of form border
  const groupDragOver = (id: number) => {
    const groupStatus = new Array(groups.length).fill(false);
    const newEnter = groupStatus.map((arg, index) => {
      if (index == id) {
        return true;
      }
      return false;
    });
    setDragEnter(newEnter);
  };

  const groupDragLeave = () => {
    const groupStatus = new Array(groups.length).fill(false);
    setDragEnter(groupStatus);
  };

  const groupDrop = (item: TermVal) => {
    const groupStatus = new Array(groups.length).fill(false);
    setDragEnter(groupStatus);
    const id = item.id;
    const group = groups.filter((arg: TermVal) => arg.id === item.id)?.[0];
    if (group.term.indexOf(elementName) >= 0) {
      alert("Please do not add conditions repeatedly!");
      return;
    }

    if (group.term.length >= 2) {
      alert("Up to two conditions per group!");
      return;
    }
    dispatch(addGroup({ id: id, term: elementName }));
  };

  return (
    <>
      <div className="main-container">
        <header>Include members in these segments</header>
        <div
          className="form"
          onDrop={drop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {groups?.map((item: TermVal, index: number) => {
            const terms = item.term || [];
            if (Array.isArray(terms) && terms.length > 0) {
              const dragEnterCurrent = dragEnter?.[index];
              return (
                <div
                  key={item.id}
                  className="groups-item"
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    groupDrop(item);
                  }}
                  onDragOver={(e) => {
                    groupDragOver(index);
                    e.preventDefault();
                  }}
                  onDragLeave={groupDragLeave}
                >
                  {index > 0 && (
                    <div className="split">
                      AND
                      <img className="split-img" src={down} alt="" />
                    </div>
                  )}
                  <div
                    className={`groups ${
                      dragEnterCurrent ? "dragEnter" : "dragLeave"
                    }`}
                  >
                    {terms?.map((value: string, index: number) => {
                      return (
                        <div key={value}>
                          {index > 0 && (
                            <div className="split">
                              AND
                              <img className="split-img" src={down} alt="" />
                            </div>
                          )}
                          <div className="groups-wrap">
                            <Term route={value} id={item.id} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
