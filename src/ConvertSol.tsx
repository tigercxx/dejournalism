import {useState} from "react"

const ConvertSol = () => {
    const [SOL, setSOL] = useState(0);
    return (
        <div>
            <input placeholder = "Amount..." name = "likes"></input>
            <div>{SOL}</div>
        </div>
    )
}

export default ConvertSol;