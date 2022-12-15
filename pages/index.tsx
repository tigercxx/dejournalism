

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MainHeader from '../src/MainHeader'
import Articles from '../src/Articles'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div style = {{border:"none"}}>
      <div >
          <h1 className = {styles.authorName}>John Doe's<br></br> Page.</h1>
      </div>
      <Articles></Articles>
    </div>

  )
}
