import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';

interface IListData {
    name: string;
    navigation : string;
    icon : JSX.Element;
}

export const listData: IListData[] = [
    {name: 'Home', navigation: '/', icon: <HomeIcon/>},
    {name: 'Documentation', navigation: '/docs', icon: <ArticleIcon/>},
    {name: 'Stock Preferences', navigation: '/pref', icon: <ArticleIcon/>},
]