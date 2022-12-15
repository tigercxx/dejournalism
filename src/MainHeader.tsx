import Link from 'next/link';
import styles from '../styles/MainHeader.module.css';
import Image from "next/Image"
import profileImg from "../public/profile-pic.png"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router"

const MainHeader = () => {
    const router = useRouter()
    return (
        <header className = {styles.header}>
        <nav>
            <ul>
                <li>
                    <Link className = {router.pathname == "/" ? styles.active : ""}  href = "/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className = {router.pathname == "/Publish" ? styles.active : ""}  href = "/Publish">
                        Publish
                    </Link>
                </li>
                <li>
                    <WalletMultiButton className="btn btn-ghost mr-4" />
                </li>
                <li>
                    <Link className = {router.pathname == "Profile" ? styles.active : ""}  href = "/Profile">
                        <Image src = {profileImg} alt = {"Top right profile picture"} className = {styles["profile-pic"]}/>
                    </Link>

                </li>
            </ul>
        </nav>
    </header>
    )
}


export default MainHeader;