import React from "react";

import ProfileCard from "../../src/ProfileCard";
import WithdrawInterface from "../../src/WithdrawInterface";

const Withdraw = () => {
    return (
    <React.Fragment>
        <ProfileCard/>
            <div style = {{position: "absolute", right: "0", height: "70%"}}>Withdrawing Likes on this page.</div>
            <WithdrawInterface/>
    </React.Fragment>
    )
}

export default Withdraw;