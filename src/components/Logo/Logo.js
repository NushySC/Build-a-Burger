import React from 'react'
import burgerLogo from '../../assets/images/burgerlogo.png';
import styles from './Logo.module.css';

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="Build-a-Burger-logo" />
    </div>
);

export default logo;