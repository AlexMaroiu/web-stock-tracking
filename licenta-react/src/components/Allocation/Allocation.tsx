import Navigation from "../Navigation/Navigation";
import Pie from "./Pie";
import { useEffect, useState } from "react";
import AllocationData from "../../models/AllocationData";
import { useAuthHeader } from "react-auth-kit";
import { getAllocation } from "../../services/requestService";

import styles from "./Allocation.module.css";
import ChangeValue from "./ChangeValue";
import AddAllocation from "./AddAllocation";
import SnackBarMessage from "../Utils/SnackBarMessage";

function Allocation () {
    const [message, setMessage] = useState<string>(null);

    const [data, setData] = useState<AllocationData>({
        amount: [],
        value: [],
        labels: [],
        symbols: [],
    });

    const auth = useAuthHeader();

    useEffect(() => {
        getAllocation(auth()).then(response => {
            setData(response.data);
        });
    }, []);    
    
    return(
        <>
            <Navigation title="Allocation"/>
            <div className={styles.container}>
                <div className={styles.pie_container}>
                    <Pie data={data}></Pie>
                </div>
                <div>
                    <div className={styles.settings}>
                        <ChangeValue data={data} setData={setData} setMessage={setMessage}></ChangeValue>
                        <AddAllocation data={data} setData={setData} setMessage={setMessage}></AddAllocation>
                    </div>
                </div>
            </div>
            <SnackBarMessage message={message} setMessage={setMessage}/>
        </>
    );
}

export default Allocation;