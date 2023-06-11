import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import CompareIcon from '@mui/icons-material/Compare';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

interface ListData {
    name: string;
    navigation: string;
    icon: JSX.Element;
}

export const publicData: ListData[] = [
    { name: "Home", navigation: "/", icon: <HomeIcon /> },
    { name: "Documentation", navigation: "/docs", icon: <ArticleIcon /> },
    { name: "Compare", navigation: "/compare", icon: <CompareIcon /> },
];

export const privateData: ListData[] = [
    {
        name: "Stock Preferences",
        navigation: "/pref",
        icon: <SettingsInputComponentIcon />,
    },
    { name: "Allocation", navigation: "/allocation", icon: <DonutLargeIcon /> },
];
