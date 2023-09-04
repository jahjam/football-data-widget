import {useEffect, useState} from 'react';

import {useRequest} from "./use-request.tsx";

export const useTeamData = () => {
    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();
    const [curMatch, setCurMatch] = useState<CurrentMatch>();
    const [liveData, setLiveData] = useState<LiveData>();

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

    return {
        homeTeam,
        awayTeam,
        curMatch,
        liveData,
        isLoading,
        isError
    }
}