import styles from "./Overview.module.css"


type Props = {
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
    liveData: LiveData | undefined;
}

function Overview(props: Props) {
    return (
        <div className={styles.container}>
            {props.homeTeam && props.awayTeam &&
                <>
                    <div className={styles.elements}>
                        <span>Goals</span>
                        <div>
                            <div>
                                {props.homeTeam.scorers.map((player, i) => <span
                                    key={i}>{player.scorerName}</span>)}
                            </div>
                            <div>
                                {props.awayTeam?.scorers.map((player, i) => <span
                                    key={i}>{player.scorerName}</span>)}
                            </div>
                        </div>
                    </div>

                    <div className={styles.elements}>
                        <span>Yellow Cards</span>
                        <div>
                            <div>
                                {props.homeTeam.yellowCards.map((player, i) => <span
                                    key={i}>{player.playerName}</span>)}
                            </div>
                            <div>
                                {props.awayTeam.yellowCards.map((player, i) => <span
                                    key={i}>{player.playerName}</span>)}
                            </div>
                        </div>
                    </div>

                    <div className={styles.elements}>
                        <span>Red Cards</span>
                        <div>
                            <div>
                                {props.homeTeam.redCards.map((player, i) => <span
                                    key={i}>{player.playerName}</span>)}
                            </div>
                            <div>
                                {props.awayTeam.redCards.map((player, i) => <span
                                    key={i}>{player.playerName}</span>)}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Overview;