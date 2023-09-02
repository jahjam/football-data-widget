import styles from "./App.module.css";

import Header from "./feature/Header/Header.tsx";

function App() {
    return (
        <>
            <main className={styles.container}>
                <Header />
            </main>
        </>
    )
}

export default App
