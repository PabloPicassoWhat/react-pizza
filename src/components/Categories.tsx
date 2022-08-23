import React, {FC, memo, useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {setActiveCategory} from "../redux/filter/slice"

import {Segmented} from "antd";
import {equals} from "ramda";

const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые', 'Классика']

const Categories: FC = () => {
  const [value, setValue] = useState<string>("Все")
  const dispatch = useDispatch()

  const onClickActiveCategory = useCallback((e: any) => {
    setValue(e)
    const filterCategory = category.findIndex(equals(e))
    dispatch(setActiveCategory({categoryId: filterCategory, categoryName: e}))
  }, [dispatch, value])

  return (
    <Segmented
      options={category}
      size="large"
      value={value}
      onChange={onClickActiveCategory}
    />
  );
};

export default memo(Categories);