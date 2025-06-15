import Main, { Duration, Interval, Order as Ordering } from "./components/Columns.tsx";
import Footer from "./components/Footer.tsx";
import Header, { Stat } from "./components/Header.tsx";
import TimerTrigger from "./components/TimerTrigger.tsx";
import useContractionTimer from "./contraction.ts";

function App() {
    const { contractions: cs, stopTimer, startTimer, active } = useContractionTimer();
    const { averageDuration, averageSinceLast, qtyLastHour } = cs;
    return (
        <>
            <Header>
                <Stat quantity={averageDuration}>durée moy</Stat>
                <Stat quantity={qtyLastHour}>contractions heure écoulée</Stat>
                <Stat quantity={averageSinceLast}>moy espacement</Stat>
            </Header>
            <Main>
                <Duration cs={cs} active>
                    durée
                </Duration>
                <Ordering cs={cs} active>
                    ordre
                </Ordering>
                <Interval cs={cs}>espacement</Interval>
            </Main>
            <Footer>
                <TimerTrigger
                    onClick={() => {
                        if (active) stopTimer();
                        else startTimer();
                    }}>
                    DEBUT D'UNE CONTRACTION
                </TimerTrigger>
            </Footer>
        </>
    );
}

export default App;
