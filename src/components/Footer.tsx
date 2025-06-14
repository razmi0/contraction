import Button from "./Button";

export default function Footer({ toggle }: { toggle: () => void }) {
    return (
        <footer className="flex justify-center items-center bg-black py-6">
            <Button onClick={toggle}>"DEBUT DES CONTRACTIONS"</Button>
        </footer>
    );
}
