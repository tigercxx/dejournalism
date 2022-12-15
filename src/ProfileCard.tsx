import Link from "next/link"
import { useRouter } from "next/router"

import styles from "../styles/ProfileCard.module.css"
import Image from "next/Image"
import profileImg from "../public/profile-pic.png"


const ProfileCard = (props:any) => {
    const route = useRouter();
    console.log(route.pathname);
    return (
        <div className = {styles.menu}>
            <div className = {styles.profileBody}><Image className = {styles["profile-pic"]}src = {profileImg} alt = "Profile Picture"/></div>
            <div style = {{width: "100%", height: "100%"}}>
                <h2 className = {styles["profile-name"]}><strong>John Doe's <br></br>Profile</strong></h2>
            </div>
            <ul className = {styles["links-menu"]}>
                <li>
                    <Link className = {route.pathname == "/Profile" ? styles.active : ""} href = "/Profile">Likes</Link>
                </li>
                <li>
                    <Link className = {route.pathname === "/Profile/Withdraw" ? styles.active : ""}  href = "/Profile/Withdraw">Withdraw</Link>
                </li>
                <li>
                    Alter Bio
                </li>
                <li>
                    Profile Picture
                </li>
                <li>
                    View Past Transactions
                </li>
                
            </ul>
            {props.children}
      
        </div>
    )
}

export default ProfileCard;