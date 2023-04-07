export default interface IPreferences {
    peratio: Characteristic;
    roe: Characteristic;
    roa: Characteristic;
}

export interface Characteristic {
    min: number;
    max: number;
}
