export interface CharacteristicFieldProps {
    label: string;
    percent: boolean;
    refMin: React.MutableRefObject<HTMLInputElement>;
    refMax: React.MutableRefObject<HTMLInputElement>;
    shrinkMin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    shrinkMax: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}