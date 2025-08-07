
"use client"
import styles from './page.module.css';


import CardList from '../components/blog/cardList/CardList';
import { useEffect } from 'react';

const Home = () => {


  return (
    <>
      <div className={styles.container}>
        <CardList />
      </div>
    </>
  );
};

export default Home;