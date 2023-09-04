import {useEffect, useState} from 'react';

import {useRequest} from "./use-request.tsx";

export const useTeamData = () => {
    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();
    const [curMatch, setCurMatch] = useState<CurrentMatch>();
    const [liveData, setLiveData] = useState<LiveData>();
    const [teamData, setTeamData] = useState<TeamData>();

    const {sendRequest, isLoading, isError} = useRequest();

    // None of the iterations in here are very performant at all and with more time I would look to optimise these much more
    useEffect(() => {
        const res = (data: Match) => {
            if (!data) return;

            // keeping all home / away team data separate in case need to use individual team data separately from one another in future
            const homeTeam: Contestant | undefined = data.contestant.find((team) => team.position === "home");
            const awayTeam: Contestant | undefined = data.contestant.find((team) => team.position === "away");

            const homeFirst11AndSubs: (First11 | Sub)[] = [
                ...data.liveData.lineups.home.first11.map(player => {
                    return {...player, teamName: data.liveData.lineups.home.teamName}
                }), ...[...data.liveData.lineups.home.first11.map(player => {
                    return {...player, teamName: data.liveData.lineups.home.teamName}
                })]
            ];
            const awayFirst11AndSubs: (First11 | Sub)[] = [
                ...data.liveData.lineups.away.first11.map(player => {
                    return {...player, teamName: data.liveData.lineups.away.teamName}
                }), ...[...data.liveData.lineups.away.first11.map(player => {
                    return {...player, teamName: data.liveData.lineups.away.teamName}
                })]
            ];

            const homeTeamPlayers = [...homeFirst11AndSubs];
            const awayTeamPlayers = [...awayFirst11AndSubs];

            const homeTeamScorers = data.liveData?.goal.filter(player => player.contestantId === homeTeam?.id);
            const awayTeamScorers = data.liveData?.goal.filter(player => player.contestantId === awayTeam?.id);
            const homeTeamYellowCards = data.liveData?.card.filter(player => player.contestantId === homeTeam?.id && player.type === "YC");
            const awayTeamYellowCards = data.liveData?.card.filter(player => player.contestantId === awayTeam?.id && player.type === "YC");
            const homeTeamRedCards = data.liveData?.card.filter(player => player.contestantId === homeTeam?.id && (player.type === "Y2C" || player.type === "RC"));
            const awayTeamRedCards = data.liveData?.card.filter(player => player.contestantId === awayTeam?.id && player.type === "Y2C" || player.type === "RC");
            const totalHomeTeamShots = homeTeamPlayers.filter(player => {
                return player.stats.shots > 0;
            });
            const totalAwayTeamShots = awayTeamPlayers.filter(player => {
                return player.stats.shots > 0;
            });
            const totalHomeTeamPassers = homeTeamPlayers.filter(player => {
                return player.stats.passes > 0;
            });
            const totalAwayTeamPassers = awayTeamPlayers.filter(player => {
                return player.stats.passes > 0;
            });
            const totalHomeTeamTacklers = homeTeamPlayers.filter(player => {
                return player.stats.tackles > 0;
            });
            const totalAwayTeamTacklers = awayTeamPlayers.filter(player => {
                return player.stats.tackles > 0;
            });
            const combinedTotalShotsPerAllPlayers = [...totalHomeTeamShots, ...totalAwayTeamShots];
            const combinedTotalPassers = [...totalHomeTeamPassers, ...totalAwayTeamPassers];
            const combinedTotalTacklers = [...totalHomeTeamTacklers, ...totalAwayTeamTacklers];

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

            setTeamData(
                {
                    homeTeamPlayers,
                    awayTeamPlayers,
                    combinedTotalShotsPerAllPlayers,
                    combinedTotalPassers,
                    combinedTotalTacklers
                }
            );
        }

        sendRequest(res);
    }, [sendRequest]);

    return {
        homeTeam,
        awayTeam,
        curMatch,
        liveData,
        teamData,
        isLoading,
        isError
    }
}