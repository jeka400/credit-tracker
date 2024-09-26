import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEuribor } from "../redux/euriborSlice";
import axios from "axios";
import { RootState } from "../redux/store";
import "../styles/Euribor.css";

const Euribor: React.FC = () => {
    const dispatch = useDispatch();
    const euribor = useSelector((state: RootState) => state.euribor);

    useEffect(() => {
        const fetchEuriborData = async () => {
            try {
                const response = await axios.get(
                    'https://euribor.p.rapidapi.com/',
                    {
                        headers: {
                            'x-rapidapi-key': 'a4f1b12192msh0b9457da667f311p139ccejsn6dcbfa47797f',
                            'x-rapidapi-host': 'euribor.p.rapidapi.com'
                        }
                    }
                );

                const euriborData = {
                    threeM: response.data["3m"],
                    sixM: response.data["6m"],
                    twelveM: response.data["12m"]
                };

                dispatch(setEuribor(euriborData));

                localStorage.setItem('euriborFetchTime', Date.now().toString());

                localStorage.setItem('euribor', JSON.stringify(euriborData));

            } catch (error) {
                console.error("Error fetching Euribor data: ", error);
            }
        }

        const shouldFetchEuribor = () => {
            const savedFethTime = localStorage.getItem('euriborFetchTime');
            
            if (!savedFethTime) return true;

            const lastFetch = parseInt(savedFethTime, 10);
            const currentTime = Date.now();
            const diffInDays = (currentTime - lastFetch) / (1000 * 60 * 60 * 24);

            return diffInDays > 31;
        }

        if (shouldFetchEuribor()) {
            fetchEuriborData();
        }

    }, [dispatch]);

    return (
        <Container id="euribor">
            <Table striped bordered hover id='euribor-table'>
                <thead>
                    <tr>
                        <th>Euribor rate for: <span>3 months</span></th>
                        <th>Euribor rate for: <span>6 months</span></th>
                        <th>Euribor rate for: <span>12 months</span></th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td>{ euribor.threeM }</td>
                        <td>{ euribor.sixM }</td>
                        <td>{ euribor.twelveM }</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default Euribor;
