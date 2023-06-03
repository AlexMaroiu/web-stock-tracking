import { useRef, useState } from "react";
import { CharacteristicFieldProps } from "../models/CharacteristicsFieldProps";

/**
 * 
 * @returns array of type CharacteristicFieldProps 
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
    {
        label: "Profit margins",
        percent: true,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
    {
        label: "Operating margins (TTM)",
        percent: true,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
    {
        label: "EBITDA",
        percent: false,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
    {
        label: "Revenue (TTM)",
        percent: false,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
    {
        label: "Revenue per share (TTM)",
        percent: false,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
    {
        label: "Gross profit (TTM)",
        percent: false,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
    {
        label: "Quarterly revenue Growth (TTM)",
        percent: false,
        refMin: useRef<HTMLInputElement | null>(),
        refMax: useRef<HTMLInputElement | null>(),
        shrinkMin: useState(false),
        shrinkMax: useState(false),
    },
];