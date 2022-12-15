import * as React from "react";

import styles from "../../styles/utils/Card.module.css";

type Props = {
    classed?: any;
    children?: React.ReactNode;
}

//Prevent typescript from inferring the type from the top. We don't want their inference to clash with other data
const Card: React.FC<Props> = ({classed, children}) => {

    
    return (
        <div className = {`${classed} ${styles["card-body"]}`}>
            {children}
        </div>
    )
}

export default Card;