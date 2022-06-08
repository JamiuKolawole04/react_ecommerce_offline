import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../../../context/GlobalState";
import axios from "../../../utils/axios"

const History = () => {
    const state = useContext(GlobalState);
    const [history, setHistory] = state.userAPI.history;
    const [token] = state.token;
    const [isAdmin] = state.userAPI.isAdmin

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const { data } = await axios({
                        method: "get",
                        url: "/api/v1/payment",
                        headers: {
                            Authorization: token
                        }
                    })
                    setHistory(data.payments);
                } else {
                    const { data } = await axios({
                        method: "get",
                        url: "/user/history",
                        headers: {
                            Authorization: token
                        }
                    })
                    setHistory(data.history);
                }

            }

            getHistory();
        }
    }, [token, isAdmin, setHistory])




    return (
        <div className="history-page">
            <h2>History</h2>

            <h4>You have {history.length} ordered</h4>

            <div className="">
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of purchased</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items => (
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${items._id}`}>View</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default History;