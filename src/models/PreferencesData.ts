export interface IData {
    label: string;
    precent: boolean;
    refMin: React.MutableRefObject<HTMLInputElement>;
    refMax: React.MutableRefObject<HTMLInputElement>;
    shrinkMin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    shrinkMax: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}