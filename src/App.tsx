import Footer from "./components/Footer.tsx";
import Grid from "./components/Grid/Grid.tsx";
import Header from "./components/Header.tsx";
import useTimer from "./timings.ts";

function App() {
    const { contractions, stopTimer, startTimer, active } = useTimer();

    const toggle = () => {
        if (active) stopTimer();
        else startTimer();
    };

    return (
        <>
            <Header contractions={contractions} />
            <Grid contractions={contractions} active={active} />
            <Footer toggle={toggle} />
        </>
    );
}

export default App;
