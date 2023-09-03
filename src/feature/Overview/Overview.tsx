import styles from "./Overview.module.css"


type Props = {
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
    liveData: LiveData | undefined;
}

function Overview(props: Props) {
    const homeTeamScorers = props.liveData?.goal.filter(player => player.contestantId === props.homeTeam?.contestant?.id);
    const awayTeamScorers = props.liveData?.goal.filter(player => player.contestantId === props.awayTeam?.contestant?.id);
    const homeTeamYellowCards = props.liveData?.card.filter(player => player.contestantId === props.homeTeam?.contestant?.id && player.type === "YC");
    const awayTeamYellowCards = props.liveData?.card.filter(player => player.contestantId === props.awayTeam?.contestant?.id && player.type === "YC");
    const homeTeamRedCards = props.liveData?.card.filter(player => player.contestantId === props.homeTeam?.contestant?.id && (player.type === "Y2C" || player.type === "RC"));
    const awayTeamRedCards = props.liveData?.card.filter(player => player.contestantId === props.awayTeam?.contestant?.id && player.type === "Y2C" || player.type === "RC");

    return (
        <div className={styles.container}>
            <div className={styles.elements}>
                <span>Goals</span>
                <div>
                    <div>
                        {homeTeamScorers && homeTeamScorers.map((player, i) => <span
                            key={i}>{player.scorerName}</span>)}
                    </div>
                    <div>
                        {awayTeamScorers && awayTeamScorers.map((player, i) => <span
                            key={i}>{player.scorerName}</span>)}
                    </div>
                </div>
            </div>

            <div className={styles.elements}>
                <span>Yellow Cards</span>
                <div>
                    <div>
                        {homeTeamYellowCards && homeTeamYellowCards.map((player, i) => <span
                            key={i}>{player.playerName}</span>)}
                    </div>
                    <div>
                        {awayTeamYellowCards && awayTeamYellowCards.map((player, i) => <span
                            key={i}>{player.playerName}</span>)}
                    </div>
                </div>
            </div>

            <div className={styles.elements}>
                <span>Red Cards</span>
                <div>
                    <div>
                        {homeTeamRedCards && homeTeamRedCards.map((player, i) => <span
                            key={i}>{player.playerName}</span>)}
                    </div>
                    <div>
                        {awayTeamRedCards && awayTeamRedCards.map((player, i) => <span
                            key={i}>{player.playerName}</span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview;