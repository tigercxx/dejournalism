import ProfileCard from "../../src/ProfileCard";
import ManageLikes from "./ManageLikes";
import Withdraw from "./Withdraw";

const Profile = () => {
    return (
        <div>
            <ProfileCard/>
            <div style = {{position: "absolute", right: "0", height: "50%"}}>Managing Likes on this page.</div>
       
            {/* <Withdraw/> */}
        </div>
    )
}

export default Profile;