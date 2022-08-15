import React from 'react';
import {useDispatch} from "react-redux";

import {setActiveCategory} from "../redux/slices/filterSlice";

type CategoriesProps = {
    valueCategory: number
}

const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = ({valueCategory}) => {
  const dispatch = useDispatch()

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