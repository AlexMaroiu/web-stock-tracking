import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import CompareIcon from '@mui/icons-material/Compare';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

interface IListData {
    name: string;
    navigation: string;
    icon: JSX.Element;
}

export const listData: IListData[] = [
    { name: "Home", navigation: "/", icon: <HomeIcon /> },
    { name: "Documentation", navigation: "/docs", icon: <ArticleIcon /> },
    {
        name: "Stock Preferences",
        navigation: "/pref",
        icon: <SettingsInputComponentIcon />,
    },
    { name: "Compare", navigation: "/compare", icon: <CompareIcon /> },
    { name: "Allocation", navigation: "/allocation", icon: <DonutLargeIcon /> },
    
];
