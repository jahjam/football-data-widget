import styles from "./Players.module.css"
import React, {useState} from "react";

type Props = {
    teamData: TeamData | undefined;
}

function Players(props: Props) {
    const [selection, setSelection] = useState<string | null>("Shots (On Target)");

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!e.target) return;

        setSelection((e.target as Element).textContent);
    }

    return (
        <div className={styles.container}>
            <span>Players</span>

            <div className={styles.buttons}>
                <button className={styles.button} type="button" onClick={handleOnClick}>Shots (On Target)</button>
                <button className={styles.button} type="button" onClick={handleOnClick}>Passes</button>
                <button className={styles.button} type="button" onClick={handleOnClick}>Tackles</button>
            </div>

            <div className={styles.stats_container}>
                {selection === "Shots (On Target)" &&
                    <>
                        <span className={styles.stats_title}>Shots On Target</span>
                        {props.teamData?.combinedTotalShotsPerAllPlayers.map((player, i) => {
                            return (
                                <div className={styles.player_stat} key={i}>
                                    <div className={styles.player_details}>
                                        <span>{player.name}</span>
                                        <span>{player.teamName}</span>
                                    </div>
                                    <div>
                                        <span>{player.stats.shots}</span>
                                        <span>({player.stats.shotsOnTarget})</span>
                                    </div>
                                </div>)
                        })}
                    </>}
            </div>
        </div>
    )
}

export default Players;