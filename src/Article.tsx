import styles from '../styles/Article.module.css'
import React from 'react'
import Image from "next/Image"
import articleImg from '../public/blockchain.png'
import heartImg from '../public/Heart-empty.png'
import Link from 'next/link';

const Article = () => {
    return (
        <Link href = "/ArticleViewer">
        <React.Fragment>
            <div className = {styles["article-body"]}>
            <div className = {styles["article-border"]}></div>
            <div className = {styles.title}><strong>Don't force blockchain on everything. <br></br>Here's why.</strong></div>
            <div className = {styles.content}>Sure, there is a lot of hype surrounding blockchain technology, but there is a lot of untapped potential....</div>
            <div className = {styles.image}>
            <Image height = {180} src = {articleImg} alt = "Article Image"/>
            </div>
            <div className = {styles.statistics}>
                <h3>Contributors: 	&nbsp;	&nbsp;<button className = {styles["contributor-button"]} type = "button">Mike</button></h3>
                <h3>Likes: 	&nbsp;	&nbsp;<button className = {styles["likes-button"]} type = "button"><Image src = {heartImg} alt = "heart-icon-not-filled"/></button></h3>
            </div>
            </div>
            
        </React.Fragment>
        </Link>
        
    )
}

export default Article;