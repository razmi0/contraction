import Main, { Duration, Interval, Order as Ordering } from "./components/Columns.tsx";
import Footer from "./components/Footer.tsx";
import Header, { Stat } from "./components/Header.tsx";
import TimerTrigger from "./components/TimerTrigger.tsx";
import useContraction from "./contraction.ts";
import { type ContractionData } from "./types.ts";
import { store } from "./utils/store.ts";

function App() {
    const { save, load } = store<ContractionData>({ key: "__contractions" });
    const {
        contractions: cs,
        stopTimer,
        startTimer,
        active,
    } = useContraction({
        init: load(),
        onChange: () => {
            save(cs);
        },
    });

    return (
        <>
            <Header>
                <Stat quantity={cs.averageDuration}>durée moy</Stat>
                <Stat quantity={cs.qtyLastHour}>contractions heure écoulée</Stat>
                <Stat quantity={cs.averageSinceLast}>moy espacement</Stat>
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
