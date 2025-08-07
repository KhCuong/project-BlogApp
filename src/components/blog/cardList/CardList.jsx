// danh sách thẻ 

import styles from './cardList.module.css';
import Pagination from '../../ui/pagination/Pagination'; // Assuming Pagination is a component that handles pagination
const CardList = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Cards</h2>
            <Pagination />
        </div>
    );
};

export default CardList;
