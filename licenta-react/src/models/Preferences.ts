import PreferencesType, { Characteristic } from "./PreferencesType";

export default class PreferencesModel implements PreferencesType{
    peratio: Characteristic;
    roe: Characteristic;
    roa: Characteristic;
    profitMargins: Characteristic;
    operatingMargins: Characteristic;
    ebitda: Characteristic;
    revenue: Characteristic;
    rps: Characteristic;
    grossProfit: Characteristic;
    revenueGrowth: Characteristic;
}