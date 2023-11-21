import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {Footer, Header} from '../components'
import { appWithTranslation } from 'next-i18next';
import AlertComponent from '../components/global/Alert';
import { Loader } from '../components/global/Loader';

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <Head>
                <title>DIF | Digital Inovation Platform</title>
                <meta name="description" content="digital Inovation platform for event registration"/>
                <link rel="icon" href="/logo-512.png"/>
                <link rel="manifest" href='/manifest.json'/>
            </Head>
            <Header/>
            <div className="pageWrapper" >
                <AlertComponent />
                <Loader />
                <Component {...pageProps} />
            </div>
            <Footer/>
        </>

    )
}

export default appWithTranslation(MyApp);
