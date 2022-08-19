import React, {FC, memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setActiveCategory} from "../redux/filter/slice"

import {CategoriesProps} from "./types";

const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: FC<CategoriesProps> = ({valueCategory}) => {
  const dispatch = useDispatch()

  // const onClickActiveCategory = (e: any): any => {
  //   dispatch(setActiveCategory(1))
  //   console.log(e)
  // }

  // () => dispatch(setActiveCategory(index))

  // className={categoryId === index ? "active" : ""}

  return (
    <div className="categories">
      <div>
        {category.map((item, index) => (
            <div key={index} onClick={() => dispatch(setActiveCategory(index))} className={valueCategory === index ? "active" : ""} >{item}</div>
          ))}
      </div>
    </div>
  );
};

export default memo(Categories);