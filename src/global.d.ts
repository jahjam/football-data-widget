declare interface Match {
    id:          string;
    description: string;
    date:        Date;
    contestant:  Contestant[];
    status:      string;
    prompts:     any[];
    insights:    Insight[];
    form:        Form;
    meta:        Meta;
    liveData:    LiveData;
}

declare interface Contestant {
    id:           string;
    name:         string;
    shortName:    string;
    officialName: string;
    code:         string;
    position:     string;
    country:      TournamentCalendar;
}

declare type Team = {
    contestant: Contestant | undefined,
    stats: Stat[],
    goals: number,
    scorers: Goal[],
    yellowCards: Card[],
    redCards: Card[]
}

declare type TeamData = {
    homeTeamPlayers: (First11 | Sub)[],
    awayTeamPlayers: (First11 | Sub)[],
    combinedTotalShotsPerAllPlayers: (First11 | Sub)[],
    combinedTotalPassers: (First11 | Sub)[],
    combinedTotalTacklers: (First11 | Sub)[],
}

declare type CurrentMatch = {
    match: Competition,
}

declare interface TournamentCalendar {
    id:   string;
    name: string;
}

declare interface Form {
    home: string[];
    away: string[];
}

declare interface Insight {
    id:   string;
    fact: string;
}

declare interface LiveData {
    matchDetails: MatchDetails;
    goal:         Goal[];
    card:         Card[];
    substitute:   Substitute[];
    lineups:      Lineups;
}

declare interface Card {
    contestantId: string;
    periodId:     number;
    timeMin:      number;
    timeMinSec:   string;
    timestamp:    Date;
    type:         string;
    playerId?:    string;
    playerName?:  string;
}

declare interface Goal {
    contestantId:      string;
    periodId:          number;
    timeMin:           number;
    timeMinSec:        string;
    timestamp:         Date;
    type:              string;
    scorerId:          string;
    scorerName:        string;
    assistPlayerId?:   string;
    assistPlayerName?: string;
}

declare interface Lineups {
    home: Away;
    away: Away;
}

declare interface Away {
    teamId:       string;
    teamName:     string;
    formation:    string;
    first11:      First11[];
    subs:         Sub[];
    stats:        Stat[];
    teamOfficial: TeamOfficial;
}

declare interface First11 {
    id:             string;
    name:           string;
    position:       First11Position;
    shirtNumber:    number;
    formationPlace: string;
    stats:          Stats;
    captain?:       string;
}

declare enum First11Position {
    Defender = "Defender",
    Goalkeeper = "Goalkeeper",
    Midfielder = "Midfielder",
    Striker = "Striker",
}

declare interface Stats {
    shots:         number;
    shotsOnTarget: number;
    passes:        number;
    tackles:       number;
    fouls:         number;
}

declare interface Stat {
    fh:    string;
    sh:    string;
    type:  string;
    value: string;
}

declare interface Sub {
    id:          string;
    name:        string;
    position:    SubPosition;
    shirtNumber: number;
    stats:       Stats;
}

declare enum SubPosition {
    Substitute = "Substitute",
}

declare interface TeamOfficial {
    id:             string;
    firstName:      string;
    lastName:       string;
    shortFirstName: string;
    shortLastName:  string;
    knownName?:     string;
    type:           string;
}

declare interface MatchDetails {
    periodId:       number;
    matchStatus:    string;
    winner:         string;
    matchLengthMin: number;
    matchLengthSec: number;
    period:         Period[];
    scores:         Scores;
    endDate:        Date;
}

declare interface Period {
    id:                  number;
    start:               Date;
    end:                 Date;
    lengthMin:           number;
    lengthSec:           number;
    announcedInjuryTime: number;
}

declare interface Scores {
    ht:    Ft;
    ft:    Ft;
    total: Ft;
}

declare interface Ft {
    home: number;
    away: number;
}

declare interface Substitute {
    periodId:      number;
    timeMin:       number;
    timeMinSec:    string;
    timestamp:     Date;
    playerOnId:    string;
    playerOnName:  string;
    playerOffId:   string;
    playerOffName: string;
}

declare interface Meta {
    coverageLevel:      string;
    tournamentCalendar: TournamentCalendar;
    competition:        Competition;
    venue:              TournamentCalendar;
}

declare interface Competition {
    id:    string;
    name:  string;
    stage: string;
}