import styles from './index.css';
import { Button, Input, Select, Form, Tag } from 'antd'

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li><Input/></li>
        <li><a href="https://umijs.org/guide/getting-started.html"><Button>Getting Started</Button></a></li>
      </ul>
    </div>
  );
}
