import { useEffect, useState } from "react";
import { questionsService } from "../../services/questionsService";
import { userStatsService } from "../../services/userStatsService";

import "./Rankings.css";

export const Rankings = () => {

    const [topAuthors, setTopAuthors] = useState([]);
    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
        userStatsService.getTop3Players()
            .then(result => {
                setTopPlayers(result);
            });

        questionsService.getTop3Authors()
            .then(result => {
                setTopAuthors(result);
            });
    }, []);

    return (
        <section className="rankings">
            <div className="topPlayers">
                <h3>Top Players</h3>
                <ul>
                    <li>
                        <span>{topPlayers[1] ? topPlayers[1].username : "-"}</span><br />
                        <span>Rank: {topPlayers[1] ? topPlayers[1].rank : "-"}</span>
                    </li>
                    <li>
                        <span>{topPlayers[0] ? topPlayers[0].username : "-"}</span><br />
                        <span>Rank: {topPlayers[0] ? topPlayers[0].rank : "-"}</span>
                    </li>
                    <li>
                        <span>{topPlayers[2] ? topPlayers[2].username : "-"}</span><br />
                        <span>Rank: {topPlayers[2] ? topPlayers[2].rank : "-"}</span>
                    </li>
                </ul>
                <img src="./images/trophies-removebg.png" alt="trophies" />
            </div>
            <div className="topAuthors">
                <h3>Top Authors</h3>
                <ul>
                    <li>
                        <span>{topAuthors[1] ? topAuthors[1].username : "-"}</span><br />
                        <span>Rank: {topAuthors[1] ? topAuthors[1].rank : "-"}</span>
                    </li>
                    <li>
                        <span>{topAuthors[0] ? topAuthors[0].username : "-"}</span><br />
                        <span>Rank: {topAuthors[0] ? topAuthors[0].rank : "-"}</span>
                    </li>
                    <li>
                        <span>{topAuthors[2] ? topAuthors[2].username : "-"}</span><br />
                        <span>Rank: {topAuthors[2] ? topAuthors[2].rank : "-"}</span>
                    </li>
                </ul>
                <img src="./images/trophies-removebg.png" alt="trophies" />
            </div>
        </section>
    );
}