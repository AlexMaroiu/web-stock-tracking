export interface Analysis{
    PERatio: EAnalysis;
    ROE: EAnalysis;
    ROA: EAnalysis;
    percent: number;
}

export enum EAnalysis{
    noMatch,
    slightyOff,
    match,
}