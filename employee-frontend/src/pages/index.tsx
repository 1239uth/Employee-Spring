import type {NextPage} from "next";
import Head from "next/head";
import styles from "./index.module.css";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Employees</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.containerOuter}>
                <div className={styles.containerInner}>
                    <h1 className={styles.title}>
                        Employees
                    </h1>

                    <a href={"/employees"}>View All Employees</a>

                </div>
            </div>
        </>
    );
};

export default Home;
