import styles from ".//Team.module.css";

type Props = {
    team: Team | undefined;
    badge: string;
}

function Team(props: Props) {
    return (
        <div className={styles.contestant_box}>
            <div className={styles.team}>
                <img className={styles.badge}
                     src={props.badge}
                     alt={`Club badge for ${props.team?.contestant?.name}`}/>
                <span className={styles.contestant}>{props.team?.contestant?.name}</span>
            </div>
            <div className={styles.score}>
                <span>{props.team?.goals}</span>
            </div>
        </div>
    )
}

export default Team;