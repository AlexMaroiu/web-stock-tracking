import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

function TableHeadButton (props : {text: string, style?: any}) {
    const [hover, setHover] = useState(false);
    
    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const style = {cursor: 'pointer', ...props.style, height: "2rem", display: "flex", justifyContent: "center"};

    if(hover){
        return (
            <>
                <div style={style}
                    onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <ClearIcon></ClearIcon>
                </div>
            </>
        );
    }

    return(
        <>
            <div style={style}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                >
                {props.text}
            </div>
        </>
    );
}

export default TableHeadButton;