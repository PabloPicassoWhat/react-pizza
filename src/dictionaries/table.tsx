import {ColumnsType} from "antd/es/table";
import {Pizza} from "../redux/pizza/types";
import {Dropdown, Image, Menu} from "antd";
import React from "react";
import {DownOutlined, EllipsisOutlined, MenuOutlined} from "@ant-design/icons/lib";
import {Link} from "react-router-dom";

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" href="#">
            просмотреть
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank"  href="#">
            редактировать
          </a>
        ),
      },
    ]}
  />
);

export const columns: ColumnsType<Pizza> = [
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
    render: (text, obj) => <Link to={`/item/${obj.id}`}>{text}</Link>
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    key: 'rating'
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    render: text => `от ${text} ₽`
  },
  {
    title: 'Вид',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: img => <Image width={36} src={img}/>
  },
  {
    title: <MenuOutlined />,
    dataIndex: 'id',
    key: 'id',
    render: img =>
      <Dropdown overlay={menu} placement="bottom">
        <EllipsisOutlined />
      </Dropdown>
  },
]