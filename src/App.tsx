import React, {FC, useState} from "react";
import {Routes, Route, Link} from "react-router-dom";

import 'antd/dist/antd.css';
import './scss/app.scss';

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import {Layout, Menu} from "antd";
import {ShopOutlined, ProfileOutlined} from "@ant-design/icons/lib";
import SiderButton from "./components/SiderButton";
import TableItems from "./components/Table/TableItems";


const {Sider, Content} = Layout

const App: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="wrapper">
      <Header/>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu mode="inline" defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: <ShopOutlined />,
                    label: <Link to="/">Главвная</Link>,
                  },
                  {
                    key: '2',
                    icon: <ProfileOutlined />,
                    label: <Link to="/table">Отчеты</Link>,
                  },
                ]}/>
        </Sider>
        <Content>
          <div className="content">
            <SiderButton collapsed={collapsed} setCollapsed={setCollapsed}/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/*" element={<NotFound/>}/>
              <Route path="/table" element={<TableItems/>}/>
            </Routes>
          </div>
        </Content>
      </Layout>
    </div>
    // <Layout>
    //   <div className="wrapper">
    //     <Header/>
    //     <div className="content">
    //       <Routes>
    //         <Sider>Sider</Sider>
    //         <Route path="/" element={<Home/>}/>
    //         <Route path="/cart" element={<Cart/>}/>
    //         <Route path="/*" element={<NotFound/>}/>
    //       </Routes>
    //     </div>
    //   </div>
    // </Layout>
  );
}

export default App;
