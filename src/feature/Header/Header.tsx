import styles from "./Header.module.css";
// Ideally these are loaded in dynamically depending on the Team name or contained in the api
import arsenalBadge from "../../assets/arsenal-badge.png"
import fulhamBadge from "../../assets/fulham-badge.png"
import Team from "../../component/Team/Team.tsx";

type Props = {
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
    curMatch: CurrentMatch | undefined,
    liveData: LiveData | undefined,
}

function Header(props: Props) {
    let matchStatus: string;

    // this would change depending on the current time within the match (assuming status names here for demonstration)
    switch (props.liveData?.matchDetails.matchStatus) {
        case "live":
            matchStatus = "Live";
            break;
        case "HT":
            matchStatus = "HT";
            break;
        default:
            matchStatus = "FT";
            break;
    }

    return (
        <header className={styles.container}>
            <div className={styles.mask}/>
            <div className={styles.teams}>
                <div className={styles.match_meta}>
                    <span className={styles.league_name}>{props.curMatch?.match.name}</span>
                    <span className={styles.time}>{matchStatus}</span>
                </div>

                <Team team={props.homeTeam} badge={arsenalBadge}/>
                <Team team={props.awayTeam} badge={fulhamBadge}/>
            </div>
        </header>
    )
}

export default Header;