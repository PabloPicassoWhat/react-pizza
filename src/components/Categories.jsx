import React from 'react';
import {useDispatch} from "react-redux";

import {setActiveCategory} from "../redux/slices/filterSlice";

const Categories = ({valueCategory}) => {
  const dispatch = useDispatch()
  const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {category.map((item, index) => (
            <li key={index} onClick={() => dispatch(setActiveCategory(index))} className={valueCategory === index ? "active" : ""}>{item}</li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;