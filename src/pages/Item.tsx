import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Typography} from "antd";
import {Link, useParams} from "react-router-dom";
import {Pizza} from "../redux/pizza/types";
import Loader from "../components/Loader/Loader";

const Item: FC = () => {
  const [pizza, setPizza] = useState<Pizza>()
  const {id} = useParams()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const {data} = await axios.get(`https://62e8ff67249bb1284eb82257.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (err) {
        alert('Ошибка при загрузке!')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <Loader/>
  }

  return (
    <div className="container">
      <Card title={pizza?.title}
            bordered={true}
            style={{ width: 600 }}
            cover={<img alt="pizza" src={pizza?.imageUrl} />}>
        <Typography.Paragraph>от {pizza?.price} р</Typography.Paragraph>
        <Typography.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography.Paragraph>
        <Link to="/table"><Button>Назад</Button></Link>
      </Card>
    </div>
  );
};

export default Item;