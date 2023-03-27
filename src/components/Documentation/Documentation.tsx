import { Grid } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import Link from '@mui/material/Link';

import styles from "./Documentation.module.css"
import { linkData } from "./DocumentationData";

function Documentation () {

    return(
        <>
            <Navigation title="Documentation">
            </Navigation>

            <div>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <div className={styles.sidebar}>
                            <ul>
                                {linkData.map(item => 
                                    <li key={item.name}><Link href={item.ref} underline="none" color="black">{item.name}</Link></li>
                                )}
                            </ul>
                        </div>
                        
                    </Grid>
                    <Grid item xs={6} >
                        <div className={styles.content}>
                            <h2>What is a stock?</h2>
                            <div>
                                <p>A stock, also known as equity, is a security that represents the ownership of a fraction of the issuing corporation. Units of stock are called "shares" which entitles the owner to a proportion of the corporation's assets and profits equal to how much stock they own. </p>
                                <p>Stocks are bought and sold predominantly on stock exchanges and are the foundation of many individual investors' portfolios. Stock trades have to conform to government regulations meant to protect investors from fraudulent practices. </p>
                                <p>What shareholders own are shares issued by the corporation, and the corporation owns the assets held by a firm. If you own 33% of the shares of a company, it is incorrect to assert that you own one-third of that company. However, you do own one-third of the company’s shares. This is known as the “separation of ownership and control.” </p>
                            </div>
                            <h2 id="peratio">What is PE ratio?</h2>
                            <div>
                                <p>The price-to-earnings ratio is the ratio for valuing a company that measures its current share price relative to its earnings per share (EPS). The price-to-earnings ratio is also sometimes known as the price multiple or the earnings multiple. </p>
                                <p>P/E ratios are used by investors and analysts to determine the relative value of a company's shares in an apples-to-apples comparison. It can also be used to compare a company against its own historical record or to compare aggregate markets against one another or over time. </p>
                            </div>
                            <h2 id="peratiottm">PE ratio (TTM)</h2>
                            <div>The trailing P/E relies on past performance by dividing the current share price by the total EPS earnings over the past 12 months.</div>
                            <h2 id="roe">Return on Equity (ROE)</h2>
                            <div>Return on equity (ROE) is a measure of financial performance calculated by dividing net income by shareholders' equity.</div>
                            <h2 id="roa">Return on assets (ROA)</h2>
                            <div>The term return on assets (ROA) refers to a financial ratio that indicates how profitable a company is in relation to its total assets.</div>
                            <h2 id="ebitda">EBITDA</h2>
                            <div>EBITDA, or earnings before interest, taxes, depreciation, and amortization, is an alternate measure of profitability to net income.</div>
                            <h2 id="forwardpe">Forward P/E</h2>
                            <div>Forward price-to-earnings (forward P/E) is a version of the ratio of price-to-earnings (P/E) that uses forecasted earnings for the P/E calculation.</div>
                            <h2 id="profitMargins">Profit margins</h2>
                            <div>Profit margin is one of the commonly used profitability ratios to gauge the degree to which a company or a business activity makes money.</div>
                            <h2 id="OperatingMargins">Operating margins (TTM)</h2>
                            <div>The operating margin measures how much profit a company makes on a dollar of sales after paying for variable costs of production, such as wages and raw materials, but before paying interest or tax.</div>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        {/* TO DO */}
                    </Grid>
                </Grid>
            </div>
            
        </>
    );
}

export default Documentation;