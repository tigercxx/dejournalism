import ProfileCard from "../../src/ProfileCard";
import React from 'react'

const ManageLikes = () => {
    return (
    <React.Fragment>
        <ProfileCard/>
        <div style = {{position: "absolute", right: "0", height: "50%"}}>Managing Likes on this page.</div>     
    </React.Fragment>
    
    )
}

export default ManageLikes;