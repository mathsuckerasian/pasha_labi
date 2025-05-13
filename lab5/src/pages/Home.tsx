import MemeCard from "../components/Card";
import { useEffect, useState } from "react";
import { getAllMemes } from "../api/meme";

const HomePage = () => {
    const [data, setData] = useState([]);

    useEffect (() => {
        getAllMemes().then((memes) => setData(memes.data.memes));
    }, []);

    return (
        <div className="row">
            {data.map((el) => (
                <MemeCard img={el.url} title={el.name} />
            ))}
        </div>
    );
};

export default HomePage;