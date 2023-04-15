import { useRef, useState } from "react";
import { CharacteristicFieldProps } from "../../models/CharacteristicsFieldProps";

/**
 * 
 * @returns array of type IPreferencesTextField 
 */
export const usePreferencesData = (): CharacteristicFieldProps[] => [
    {
        label: "P/E ratio (TTM)",
        percent: false,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
    {
        label: "ROE",
        percent: true,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
    {
        label: "ROA",
        percent: true,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
];