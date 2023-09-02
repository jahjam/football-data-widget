import styles from "./General.module.css";
import Stat from "../../component/Stat/Stat.tsx";
import React, {useState} from "react";

type StatTypes = {
    ontargetScoringAtt: string,
    totalScoringAtt: string,
    wonCorners: string,
    possessionPercentage: string,
}

const statTypes: StatTypes = {
    ontargetScoringAtt: "Shots On Target",
    totalScoringAtt: "Shots",
    wonCorners: "Corners",
    possessionPercentage: "Possession"
}

type Props = {
    homeTeam: Team | undefined;
    awayTeam: Team | undefined;
}

function General(props: Props) {
    const [period, setPeriod] = useState<string | null>("1st Half");

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!e.target) return;

        setPeriod((e.target as Element).textContent);
    }

    return (
        <div className={styles.container}>
            <span className={styles.title}>General</span>
            <div className={styles.buttons}>
                <button className={styles.button} type="button" onClick={handleOnClick}>Full Time</button>
                <button className={styles.button} type="button" onClick={handleOnClick}>1st Half</button>
                <button className={styles.button} type="button" onClick={handleOnClick}>2nd Half</button>
            </div>

            {props.homeTeam?.stats.map((stat, i) => (
                <div key={i} className={styles.stats_box}>
                    <span>{statTypes[stat.type as keyof StatTypes]}</span>
                    <div className={styles.stats}>
                        <div>
                            <Stat stat={props.homeTeam?.stats.find(teamStat => teamStat.type === stat.type)}
                                  period={period}/>{stat.type === "possessionPercentage" && "%"}
                        </div>
                        <div>
                            <Stat stat={props.awayTeam?.stats.find(teamStat => teamStat.type === stat.type)}
                                  period={period}/>{stat.type === "possessionPercentage" && "%"}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default General;