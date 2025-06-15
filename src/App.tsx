import Main, { Duration, Interval, Order as Ordering } from "./components/Columns.tsx";
import Footer from "./components/Footer.tsx";
import Header, { Stat } from "./components/Header.tsx";
import TimerTrigger from "./components/TimerTrigger.tsx";
import useContraction from "./contraction.ts";
import useMetaTitle from "./meta-title.ts";
import { type ContractionData } from "./types.ts";
import { formatDuration } from "./utils/format.ts";
import { store } from "./utils/store.ts";

function App() {
    const { insert } = useMetaTitle();
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

    const toggle = () => {
        if (active) stopTimer();
        else startTimer();
    };

    if (active) {
        insert(`En cours : ${formatDuration(cs.current?.duration ?? null) ?? "-"}`);
    } else {
        insert("Mes contractions");
    }

    return (
        <>
            <Header>
                <Stat quantity={cs.averageDuration}>durée moy</Stat>
                <Stat quantity={cs.qtyLastHour}>contractions heure écoulée</Stat>
                <Stat quantity={cs.averageSinceLast}>moy espacement</Stat>
            </Header>
            <Main>
                <Duration cs={cs} title="durée" active />
                <Ordering cs={cs} title="ordre" active />
                <Interval cs={cs} title="espacement" />
            </Main>
            <Footer>
                <TimerTrigger onClick={toggle}>DEBUT D'UNE CONTRACTION</TimerTrigger>
            </Footer>
        </>
    );
}

export default App;
