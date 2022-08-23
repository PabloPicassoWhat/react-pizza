import React from 'react';

import styles from "./NotFoundBlock.module.scss"
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const NotFoundBlock: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="К сожалению данная страница отсутствует в нашем интернет-магазине"
      extra={<Link to="/"><Button type="primary">На главную</Button></Link>}
    />
    // <div className={styles.root}>
    //   <span>😕</span>
    //   <br/>
    //   <h1>Ничего не найдено</h1>
    //   <p className={styles.description}>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
    // </div>
  );
};

export default NotFoundBlock;