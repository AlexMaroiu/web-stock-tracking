export interface Analysis{
    PERatio: EAnalysis;
    ROE: EAnalysis;
    ROA: EAnalysis;
}

export enum EAnalysis{
    noMatch,
    slightyOff,
    match,
}