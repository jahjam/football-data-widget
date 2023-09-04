import styles from "./App.module.css";

import Header from "./feature/Header/Header.tsx";
import {useState} from "react";
import Nav from "./feature/Nav/Nav.tsx";
import General from "./feature/General/General.tsx"
import Overview from "./feature/Overview/Overview.tsx";
import {useTeamData} from "./hooks/use-team-data.tsx";
import Players from "./feature/Players/Players.tsx";

function App() {
    const {
        homeTeam,
        awayTeam,
        curMatch,
        liveData,
        teamData,
        isLoading,
        isError
    } = useTeamData();

    const [currentSelect, setCurrentSelect] = useState<string>("general");

    const handleSelect = (selection: string) => {
        setCurrentSelect(selection);
    }

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
                    {currentSelect.toLowerCase() === "players" && <Players teamData={teamData}/>}
                </main>
            }
        </>
    )
}

export default App
