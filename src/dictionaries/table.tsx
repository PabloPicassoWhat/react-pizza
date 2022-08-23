import {ColumnsType} from "antd/es/table";
import {Pizza} from "../redux/pizza/types";
import {Image} from "antd";
import React from "react";

export const columns: ColumnsType<Pizza> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: text => `от ${text} ₽`
  },
  {
    title: 'Image',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: img => <Image width={36} src={img}/>
  }
]