import React from 'react';

const Categories = ({valueCategory, onClickCategory}) => {
  const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {category.map((item, index) => (
            <li key={index} onClick={() => onClickCategory(index)} className={valueCategory === index ? "active" : ""}>{item}</li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;