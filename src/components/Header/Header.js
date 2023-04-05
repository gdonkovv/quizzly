import { Link } from 'react-router-dom';

import { useAuthContext } from "../../contexts/AuthContext";

import "./Header.css";

export const Header = () => {
    const { isAuthenticated, userUsername, userImageUrl, userRank } = useAuthContext();

    return (
        <header>
            <div className="title">
                <span>QUIZZLY</span>
            </div>
            <div className="navigation">
                <nav>
                    <ul>
                        <li>
                            <Link to="/"><i className="fas fa-home"></i> Home</Link>
                        </li>
                        <li>
                            <Link to="/play"><i className="fas fa-gamepad"></i> Play</Link>
                        </li>
                        {isAuthenticated &&
                            <>
                                <li>
                                    <Link to="/my-questions"
                                    ><i className="fas fa-question-circle"></i> My Questions</Link>
                                </li>
                                <li>
                                    <Link to="/rankings"><i className="fas fa-trophy"></i> Rankings</Link>
                                </li>
                            </>
                        }
                        <div className="login-register">
                            {isAuthenticated && <Link to="/logout">Logout</Link>}
                            {!isAuthenticated &&
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>}


                        </div>
                    </ul>
                </nav>
            </div>
            <div className="userInfo">
                <div>
                    <div>Username: {userUsername ? userUsername : "-"}</div>
                    <div>Rank: {userRank ? userRank : "-"}</div>
                </div>
                {userImageUrl ?
                    <img src={userImageUrl} alt="userImage" />
                    : <i className="fas fa-user-circle"></i>
                }
            </div>
        </header>
    );
}