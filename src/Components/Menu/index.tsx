import React, { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { dragBegin } from "../../Store/reducer";
import { MenuData, SecondMenu, ThirdMenu } from '../../Protype/menu';

const bookImg = require('../../assets/Images/book.png');
const iconImg = require('../../assets/Images/icon.png');

interface IProps {
  data: MenuData; //menu name
  icon?: string; //图标
}

const down = require("../../assets/Images/down.png");
const left = require("../../assets/Images/right.png");
const point = require("../../assets/Images/point.png");

/**
 * menu modules
 */
export default function Menu(props: IProps) {
  const { data, icon } = props || {};
  const [FirstMenu, setFirstMenu] = useState(false);
  const [SecondMenu, setSecondMenu] = useState(false);
  const [currentDrag, setCurrentDrag] = useState('')

  const dispatch = useDispatch();

  const ChangeFirst = () => {
    setFirstMenu(!FirstMenu);
  };

  const ChangeSecond = () => {
    setSecondMenu(!SecondMenu);
  };



  const drag = (name: string) => {
    setCurrentDrag(name)
    let res = ''
    const value: Array<SecondMenu> = data.value;
    value.forEach((item: SecondMenu) => {
      const thirdVal: Array<ThirdMenu> = item.value;
      thirdVal.forEach((args: ThirdMenu) => {
        if (args.name == name) {
          res = `${data.name}/${item.name}/${name}`
        }
      })
    })
    // eg. My Data/DeviceReach-ppid/Age
    dispatch(dragBegin(res));
  };

  const dragEnd = () => {
    setCurrentDrag('')
  }

  return (
    <>
      <div className="list-wrap">
        <div className="container level1" onClick={ChangeFirst}>
          <img className="list-status" src={FirstMenu ? down : left} alt="" aria-checked={true} />
          <img className="list-status" src={bookImg} alt="" />
          <div className="listName">{data.name}</div>
        </div>
        {!!FirstMenu && (
          <>
            {data?.value?.map((item: SecondMenu) => {
              return (
                <div key={item.name} className="list-wrap">
                  <div className="container level2" onClick={ChangeSecond}>
                    <img
                      className="list-status"
                      src={SecondMenu ? down : left}
                      alt=""
                    />
                    <img className="list-status" src={bookImg} alt="" />
                    <div className="listName">{item.name}</div>
                  </div>
                  {!!SecondMenu && (
                    <>
                      {item?.value?.map((child: ThirdMenu) => {
                        return (
                          <div
                            key={child.name}
                            onDragStart={() => drag(child.name)}
                            onDragEnd={dragEnd}
                            className={`list-wrap level3 ${currentDrag == child.name ? 'dragBegin' : ''}`}
                            draggable={true}
                          >
                            <div className="container">
                              <img className="list-status" src={point} alt="" />
                              <img
                                className="list-status"
                                src={child.icon || iconImg}
                                alt=""
                              />
                              <div className="list-status">{child.name}</div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
