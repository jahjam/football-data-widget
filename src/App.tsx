import styles from "./App.module.css";

import Header from "./feature/Header/Header.tsx";
import {useRequest} from "./hooks/use-request.tsx";
import {useEffect, useState} from "react";
import Nav from "./feature/Nav/Nav.tsx";
import General from "./feature/General/General.tsx"
import Overview from "./feature/Overview/Overview.tsx";

function App() {
    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();
    const [curMatch, setCurMatch] = useState<CurrentMatch>();
    const [liveData, setLiveData] = useState<LiveData>();

    const [currentSelect, setCurrentSelect] = useState<string>("general");

    const handleSelect = (selection: string) => {
        setCurrentSelect(selection);
    }

    const {sendRequest, isLoading, isError} = useRequest();

    useEffect(() => {
        const res = (data: Match) => {
            const homeTeam: Contestant | undefined = data.contestant.find((team) => team.position === "home");
            const awayTeam: Contestant | undefined = data.contestant.find((team) => team.position === "away");

            const homeTeamScorers = data.liveData?.goal.filter(player => player.contestantId === homeTeam?.id);
            const awayTeamScorers = data.liveData?.goal.filter(player => player.contestantId === awayTeam?.id);
            const homeTeamYellowCards = data.liveData?.card.filter(player => player.contestantId === homeTeam?.id && player.type === "YC");
            const awayTeamYellowCards = data.liveData?.card.filter(player => player.contestantId === awayTeam?.id && player.type === "YC");
            const homeTeamRedCards = data.liveData?.card.filter(player => player.contestantId === homeTeam?.id && (player.type === "Y2C" || player.type === "RC"));
            const awayTeamRedCards = data.liveData?.card.filter(player => player.contestantId === awayTeam?.id && player.type === "Y2C" || player.type === "RC");

            setHomeTeam({
                contestant: homeTeam,
                stats: data.liveData.lineups.home.stats,
                goals: data.liveData.matchDetails.scores.total.home,
                scorers: homeTeamScorers,
                yellowCards: homeTeamYellowCards,
                redCards: homeTeamRedCards,
            });
            setAwayTeam({
                contestant: awayTeam,
                stats: data.liveData.lineups.away.stats,
                goals: data.liveData.matchDetails.scores.total.away,
                scorers: awayTeamScorers,
                yellowCards: awayTeamYellowCards,
                redCards: awayTeamRedCards,
            });
            setCurMatch({
                match: data.meta.competition,
            });
            setLiveData(data.liveData);
        }

        sendRequest(res);
    }, [sendRequest]);

    return (
        <>
            {isLoading && <span>Loading...</span>}

            {isError ?
                <span>Something went wrong!</span>
                :
                <main className={styles.container}>
                    <Header awayTeam={awayTeam} homeTeam={homeTeam} curMatch={curMatch} liveData={liveData}/>
                    <Nav handleSelect={handleSelect}/>
                    {currentSelect.toLowerCase() === "general" &&
                        <General homeTeam={homeTeam} awayTeam={awayTeam}/>}
                    {currentSelect.toLowerCase() === "overview" &&
                        <Overview homeTeam={homeTeam} awayTeam={awayTeam} liveData={liveData}/>}
                </main>
            }

        </>
    )
}

export default App
