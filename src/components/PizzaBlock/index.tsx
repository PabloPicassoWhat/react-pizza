import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Button, Card, Segmented, Typography} from "antd";

import {addItem} from "../../redux/cart/slice";
import {selectCartItemById} from "../../redux/cart/selectors"
import {CartItem} from "../../redux/cart/types";
import {allPass, always, equals, lt, gt} from "ramda";
import {setActiveCategory} from "../../redux/filter/slice";

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({id, title, price, imageUrl, sizes, types}) => {
  const [valueType, setValueType] = useState<string>('тонкое')
  const [valueSize, setValueSize] = useState<number>(26)

  const [activeSize, setActiveSize] = useState<number>(0)
  const [activeType, setActiveType] = useState<number>(0)
  const typeNames = ['тонкое', 'традиционное']

  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = useCallback(() => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: activeSize,
      count: 0
    }
    dispatch(addItem(item))
  }, [dispatch, valueType, valueSize])

  const onClickActiveType = useCallback((e: any) => {
    setValueType(e)
    const filterType = typeNames.findIndex(equals(e))
    setActiveType(filterType)
  }, [valueType])

  const onClickActiveSize = useCallback((e: any) => {
    setValueSize(e)
    setActiveSize(e)
  }, [valueSize])

  return (
    <Card
      hoverable
      style={{ width: 280, marginLeft: 20, marginTop: 10, marginBottom: 10 }}
      cover={<img alt="pizza" src={imageUrl} />}
    >
      <Card.Meta title={title} description={price} />
      <Segmented
        options={typeNames}
        size="middle"
        value={valueType}
        onChange={onClickActiveType}
      />
      <Segmented
        options={sizes}
        size="middle"
        value={valueSize}
        onChange={onClickActiveSize}
      />
      <Button onClick={onClickAdd}>
        Добавить {gt(Number(addedCount), 0) && addedCount}
      </Button>
    </Card>
    // <div className="pizza-block-wrapper">
    //   <div className="pizza-block">
    //     <img
    //       className="pizza-block__image"
    //       src={imageUrl}
    //       alt="Pizza"
    //     />
    //     <Typography.Title level={4} className="pizza-block__title">{title}</Typography.Title>
    //     <div className="pizza-block__selector">
    //       <ul>
    //         {types.map((type, i) => (
    //           <li key={i} onClick={() => setActiveType(i)}
    //               className={activeType === i ? "active" : ""}>{typeNames[type]}</li>
    //         ))}
    //       </ul>
    //       <ul>
    //         {sizes.map((size, i) => (
    //           <li key={i} onClick={() => setActiveSize(i)} className={activeSize === i ? "active" : ""}>{size} см.</li>
    //         ))}
    //       </ul>
    //     </div>
    //     <div className="pizza-block__bottom">
    //       <div className="pizza-block__price">от {price} ₽</div>
    //       <button onClick={onClickAdd} className="button button--outline button--add">
    //         <svg
    //           width="12"
    //           height="12"
    //           viewBox="0 0 12 12"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
    //             fill="white"
    //           />
    //         </svg>
    //         <span>Добавить</span>
    //         { Number(addedCount) > 0 && addedCount}
    //         {/*{lt(Number(addedCount), 0) && <i>{addedCount}</i>}*/}
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PizzaBlock;