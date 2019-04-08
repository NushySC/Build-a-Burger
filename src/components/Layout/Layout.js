import React from 'react';

import Auxi from '../../hoc/Auxi';
import styles from './Layout.module.css';
import Toolbar from'../Navigation/Toolbar/Toolbar';


const layout = ( props ) => (
    <Auxi>
            <Toolbar />
        <main className={styles.Content}>
            {props.children}
        </main>
    </Auxi>
);

export default layout;