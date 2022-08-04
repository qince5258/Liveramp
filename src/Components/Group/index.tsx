import React, {useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeTerm } from "../../Store/reducer";
import { Option } from '../../Protype/termPram'

const point = require("../../assets/Images/point.png");
const search = require("../../assets/Images/search.png");

interface TermProps {
  route: string;
	id: number;
}
/**
 * computation module
 */
export default function Group(props: TermProps) {
  const  { route, id } = props || "";
	const term = route.split("/")?.pop() || "";
  const [checkedOpts, setCheckedOpts] = useState([]);
  const [checkedCount, setCheckedCount] = useState(0);
	const [options, setOptions] = useState([]);
	const dispatch = useDispatch();

	// axios get data
	useEffect(() => {
		axios.get('/api', {
			params: {term: term}
		}).then(res => {
			if (res.data.code === 1) {
				const data = res.data.result || []
				setOptions(data)
			} else {
				console.log(res.data.message)
			}
		}).catch(err => {
			console.log(err)
		})
	}, [])

	/**
	 * checkbox change status
	 */
  const onCheck = (item: Option) => {
    const index = checkedOpts.findIndex((value) => item.value === value);
    let newCheckedOpts: any = checkedOpts;
    if (index >= 0) {
      newCheckedOpts.splice(index, 1);
    } else {
      newCheckedOpts = [...checkedOpts, item.value];
    }
    setCheckedOpts(newCheckedOpts);
    setCheckedCount(newCheckedOpts.length);
  };

	/**
	 * clear all checked
	 */
  const clear = () => {
    setCheckedOpts([]);
    setCheckedCount(0);
  };

	/**
	 * guess remove the term
	 */
	const close = () => {
		dispatch(removeTerm({id: id, term: route}))

	}

  const isChecked = (item: Option) => {
    const index = checkedOpts.findIndex((value) => item.value === value);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <header className="group-header">
        <img className="header-img" src={point} alt="" />
          <div className="checked-text">
            {`${term} = ${checkedOpts.join(",")}`}
          </div>
					<div className="close" onClick={close} >x</div>
      </header>
      <div className="routes">{route}</div>
      <div className="search-box">
        <img src={search} alt="" className="search-img" />
        <input className="input" type="text" placeholder="Search" />
      </div>
      <div className="option-box">
        <div className="option-head">
          <div className="option-clear" onClick={clear}>
            clear all{" "}
          </div>
          <div className="select">{checkedCount} select</div>
        </div>
        <div className="options">
          {options?.map((item: Option) => {
            return (
              <div className="option-item" key={item.value}>
                <input
                  type="checkbox"
                  name={String(item.value)}
                  id=""
                  onChange={() => {}}
                  checked={isChecked(item)}
                  onClick={() => onCheck(item)}
                />
                <div className="option-value">{item.value}</div>
                <div className="option-count">{item.count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
