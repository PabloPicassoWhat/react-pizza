import React, {useState} from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {category.map((catg, index) => (
            <li key={index} onClick={() => setActiveIndex(index)} className={activeIndex === index ? "active" : ""}>{catg}</li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;