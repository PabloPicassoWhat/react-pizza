import React from 'react';
import {Link} from "react-router-dom";

import {Typography} from "antd";

import cartEmptyImg from "../assets/img/empty-cart.png"

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <Typography.Title level={2}>Корзина пустая 😕</Typography.Title>
      <Typography.Paragraph>
        Вероятней всего, вы не заказывали ещё пиццу.<br/>
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </Typography.Paragraph>
      <img src={cartEmptyImg} alt="Empty cart"/>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
    </div>
  );
};

export default CartEmpty;