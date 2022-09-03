import React, {Dispatch, FC, SetStateAction} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons/lib";

type SiderButtonProps = {
  collapsed: boolean,
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

const SiderButton: FC<SiderButtonProps> = ({collapsed, setCollapsed}) => {
  const icon = collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>

  return (
    <div onClick={() => setCollapsed(!collapsed)}>
      {icon}
    </div>
  );
};

export default SiderButton;