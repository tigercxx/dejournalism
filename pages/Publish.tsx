// import {useForm} from 'react-hook-form'

import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "../styles/Publish.module.css";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    Transaction,
    LAMPORTS_PER_SOL,
    TransactionSignature,
    SystemProgram,
    PublicKey,
} from "@solana/web3.js";
import { FC, useCallback, useState, ChangeEvent, SetStateAction } from "react";
import {
    Metaplex,
    walletAdapterIdentity,
    bundlrStorage,
} from "@metaplex-foundation/js";
import {
    Connection,
    clusterApiUrl,
    Keypair,
    PublicKeyInitData,
    Signer,
} from "@solana/web3.js";
import { createYield } from "typescript";
import { resolveSoa } from "dns/promises";

const Publish = () => {
    const { connection } = useConnection();
    // const { publicKey, sendTransaction } = useWallet();
    const wallet = useWallet();
    const SOL_PRICE_OF_LIKE = 0.1;
    const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(
            bundlrStorage({
                address: "https://devnet.bundlr.network",
                providerUrl:
                    "https://shy-frequent-resonance.solana-devnet.discover.quiknode.pro/599801ea48c337f34c36579cb1d17a6836979506/",
                timeout: 60000,
            })
        );

    const [author, setAuthor] = useState("John");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File>();
    const [role, setRoleValid] = useState(true);
    const [description, setDescription] = useState("");

    const inputArr = [
        {
            type: "text",
            id: 0,
            hash: "example",
            name: "name",
            percentage: 0,
            role: "writer",
        },
    ];

    const [arr, setArr] = useState(inputArr);
    const [renderDetail, setRenderDetail] = useState(true);

    const addAuthorHandler = (event: any) => {
        event.preventDefault();
        console.log("Here!!");
        setAuthor(event.target.value);
    };

    const addTitleHandler = (event: any) => {
        event.preventDefault();
        setTitle(event.target.value);
    };

    const addDescHandler = (event: any) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    const addInputHandler = (event: any) => {
        event.preventDefault();
        setArr((prevState) => {
            const prevId = prevState[prevState.length - 1].id;
            return [
                ...prevState,
                {
                    type: "text",
                    id: prevId + 1,
                    hash: "smth",
                    name: "example",
                    percentage: 0,
                    role: "writer",
                },
            ];
        });
        console.log(arr);
        setRenderDetail(false);
    };

    const contributorNameHandler = (event: any) => {
        event.preventDefault();

        const index = event.target.id;
        console.log("The target if is ");
        console.log(event);
        setArr((prevState) => {
            //Must do this to create a new shallow copy with no reference to original array.
            const newArr = prevState.slice();
            // console.log("newArr is ");
            // console.log(newArr[index]);
            newArr[index].name = event.target.value;
            // console.log(newArr);
            return newArr;
        });
        console.log(arr);
    };

    const [percentageInvalid, setPercentageInvalid] = useState(false);

    const contributorPercentageHandler = (event: any) => {
        event.preventDefault();
        const index = event.target.id;
        setArr((prevState) => {
            const newArr = prevState.slice();
            newArr[index].percentage = event.target.value;
            return newArr;
        });
        var max = 0;
        for (var i of arr) {
            max += i.percentage;
        }
        setPercentageInvalid(max <= 100);
        console.log(arr);
    };

    const contributorRoleHandler = (event: any) => {
        event.preventDefault();
        const index = event.target.id;
        setArr((prevState) => {
            const newArr = prevState.slice();
            newArr[index].role = event.target.value;
            return newArr;
        });
        const newArr = arr.slice();
        if (arr[index].role.length > 0) {
            setRoleValid(true);
        } else {
            setRoleValid(false);
        }
        console.log(arr);
    };

    const minusHandler = (event: any) => {
        let newFormValues = [...arr];
        newFormValues.splice(event.target.id, 1);
        setArr((prevState) => {
            return newFormValues;
        });
        console.log(arr);
    };

    //Later remember to add some form validation

    // Xian Xiang's code
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("http://localhost:3000/upload_article", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });
        console.log("pdf uploaded");
        const data = await response.json();
        console.log(data.link);
        return `${data.link}`;
    };

    const handleMetadataUpload = async (
        event: { preventDefault: () => void },
        pdfURI: any,
        contributors: any[],
        shares: any[],
        roles: number[]
    ) => {
        event.preventDefault();
        console.log(`[inputs in meta] ${title} ${description} ${author}`);
        const metadataUpload = JSON.stringify({
            title: `${title} meta`,
            description: `${description}`,
            author: `${author}`,
            image: "https://bafkreienbbetx2x57qim2inwvnxksmz2m3s3kmqlp7uhkwl6tzan3o5zj4.ipfs.nftstorage.link/",
            timestamp: Date.now(),
            contributors: contributors,
            shares: shares,
            roles: roles,
            properties: {
                files: {
                    type: "application/pdf",
                    uri: `${pdfURI}`,
                },
            },
        });
        const response = await fetch("http://localhost:3000/upload_metadata", {
            method: "POST",
            body: metadataUpload,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data.link);
        return `${data.link}`;
    };

    const submitHandler = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log("new click");
        if (!wallet.publicKey) {
            console.log("error", "Wallet not connected!");
            alert("Wallet not Connected!");
            return;
        }
        const contributors = [];
        const shares = [];
        const roles = [];
        const creators = [];
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            creators.push({
                address: new PublicKey(arr[i].name),
                share: arr[i].percentage,
            });
            total += Number(arr[i].percentage);
            contributors.push(arr[i].name);
            roles.push(arr[i].role);
            shares.push(Number(arr[i].percentage));
        }
        creators.push({
            address: wallet.publicKey,
            authority: metaplex.identity(),
            share: 100 - total,
        });
        contributors.push(wallet.publicKey.toBase58());
        shares.push(100 - total);
        roles.push("Main Author");
        // console.log(total);
        // console.log(creators);
        // console.log(contributors);
        // console.log(roles);
        // console.log(shares);

        const pdfURI = await handleUpload(event);
        console.log(`pdf uri ${pdfURI}`);
        const URI = await handleMetadataUpload(
            event,
            pdfURI,
            contributors,
            roles,
            shares
        );
        console.log(`metadata uri ${URI}`);
        try {
            const { nft } = await metaplex.nfts().create({
                uri: URI,
                name: `${title} nft`,
                sellerFeeBasisPoints: 500, // Represents 5.00%.
                symbol: "OYC",
                updateAuthority: metaplex.identity(),
                creators: creators,
                isMutable: false,
                isCollection: true,
                collection: new PublicKey(
                    "6Qj2wrdUqdA3Vxad5pKbaw8BJNK2sajxjE9z3MzSCraM"
                ),
                collectionIsSized: true,
            });
            // alert("Transaction Confirmed!");
            console.log(nft);
            console.log(nft.address.toString());
        } catch (error: any) {
            alert(error);
            console.log(error);
        }
    };

    return (
        <div className={style.wrapper}>
            <Form className={style.formWrapper}>
                <Row>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            placeholder="Give a brilliant title for your work"
                            onChange={addTitleHandler}
                        ></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            placeholder="Tell us a little bit about your work"
                            onChange={addDescHandler}
                        ></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="formAuthor">
                        <Form.Label>Author:</Form.Label>
                        <Form.Control
                            placeholder="Make yourself known"
                            onChange={addAuthorHandler}
                        ></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="formAuthor">
                        <Form.Label>PDF of your article:</Form.Label>
                        <Form.Control
                            placeholder="Make yourself known"
                            type="file"
                            onChange={handleFileChange}
                        ></Form.Control>
                    </Form.Group>
                </Row>

                <Button
                    className={style["add-button"]}
                    variant="outline-light"
                    onClick={addInputHandler}
                >
                    +
                </Button>

                {/* just note that the idx below refers to the index of the element and not the id I gave it as define in the object inputArr */}
                {arr.map((obj, idx) => {
                    return (
                        <Row key={idx} className="mb-3">
                            <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId={idx.toString()}
                            >
                                {idx === 0 && (
                                    <Form.Label>
                                        Additional Contributors:
                                    </Form.Label>
                                )}
                                <Form.Control
                                    placeholder="Contributor's name..."
                                    onChange={contributorNameHandler}
                                ></Form.Control>
                                {idx === arr.length - 1 && (
                                    <Form.Text className="text-muted">
                                        Give credit where it's due.
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId={idx.toString()}
                            >
                                {idx === 0 && <Form.Label>Role:</Form.Label>}
                                <Form.Control
                                    placeholder="Contributor's role..."
                                    onChange={contributorRoleHandler}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                className="mb-3"
                                controlId={idx.toString()}
                            >
                                {idx === 0 && (
                                    <Form.Label>Percentage of share</Form.Label>
                                )}
                                <Form.Control
                                    placeholder="Contributor's share..."
                                    type="number"
                                    onChange={contributorPercentageHandler}
                                ></Form.Control>
                            </Form.Group>

                            {idx > 0 && (
                                <Button
                                    className="sm-3"
                                    variant="outline-light"
                                    className={style["minus-button"]}
                                    onClick={minusHandler}
                                >
                                    -
                                </Button>
                            )}
                        </Row>
                    );
                })}

                <Button
                    type="submit"
                    className={style.submit}
                    variant="outline-light"
                    onClick={submitHandler}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Publish;
