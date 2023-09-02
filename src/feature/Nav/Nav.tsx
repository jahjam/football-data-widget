import styles from "./Nav.module.css";
import React, {useRef} from "react";

type Props = {
    handleSelect: (selection: string) => void;
}

function Nav (props: Props) {
    const liRef = useRef<HTMLLIElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const menuItem = (e.target as Element).textContent;

        if (!menuItem) return;

        props.handleSelect(menuItem);
    }

    return (
        <div className={styles.container}>
            <ul className={styles.nav}>
                <li ref={liRef} className={styles.nav_item} onClick={handleClick}>
                    Overview
                </li>
                <li ref={liRef} className={styles.nav_item} onClick={handleClick}>
                    General
                </li>
                <li ref={liRef} className={styles.nav_item} onClick={handleClick}>
                    ARS
                </li>
                <li ref={liRef} className={styles.nav_item} onClick={handleClick}>
                    FUL
                </li>
                <li ref={liRef} className={styles.nav_item} onClick={handleClick}>
                    Players
                </li>
            </ul>
        </div>
    )
}

export default Nav;