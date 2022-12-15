import Card from "./utils/Card";

import styles from "../styles/WithdrawInterface.module.css"

const WithdrawInterface = () => {
    return (
        //Just pass your height and positioning.
        <Card classed = {styles["withdraw-body"]}>
            <h1 className = {styles.bodyText}>You Have...</h1>
            <h1 className = {styles.number}>123 <span>(~35.06 SOL)</span></h1>
            <h1 className = {styles.bodyTextTwo}>Waiting To Be Withdrawn</h1>

            
        </Card>
    )
}

export default WithdrawInterface;