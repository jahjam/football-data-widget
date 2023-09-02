import styles from "./App.module.css";

import Header from "./feature/Header/Header.tsx";
import {useRequest} from "./hooks/use-request.tsx";
import {useEffect, useState} from "react";

function App() {
    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();
    const [curMatch, setCurMatch] = useState<CurrentMatch>();
    const [liveData, setLiveData] = useState<LiveData>();

    const {sendRequest, isLoading, isError} = useRequest();

    useEffect(() => {
        const res = (data: Match) => {
            const homeTeam: Contestant | undefined = data.contestant.find((team) => team.position === "home");
            const awayTeam: Contestant | undefined = data.contestant.find((team) => team.position === "away");

            setHomeTeam({
                contestant: homeTeam,
                stats: data.liveData.lineups.home.stats,
                goals: data.liveData.matchDetails.scores.total.home
            });
            setAwayTeam({
                contestant: awayTeam,
                stats: data.liveData.lineups.away.stats,
                goals: data.liveData.matchDetails.scores.total.away
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
            {isLoading &&  <span>Loading...</span>}

            {isError ?
                <span>Something went wrong!</span>
                :
                <main className={styles.container}>
                    <Header awayTeam={awayTeam} homeTeam={homeTeam} curMatch={curMatch} liveData={liveData}/>
                </main>
            }

        </>
    )
}

export default App
