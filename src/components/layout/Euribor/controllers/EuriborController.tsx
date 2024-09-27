import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEuribor } from '../../../../redux/euriborSlice';
import axios from 'axios';
import EuriborContainer from '../views/EuriborContainer';
import { EuriborData } from '../models/euriborModel';
import { RootState } from '../../../../redux/store';

const EuriborController: React.FC = () => {
  const dispatch = useDispatch();
  
  const euribor = useSelector((state: RootState) => state.euribor);

  useEffect(() => {
    const fetchEuriborData = async () => {
      try {
        const response = await axios.get('https://euribor.p.rapidapi.com/', {
          headers: {
            'x-rapidapi-key': 'a4f1b12192msh0b9457da667f311p139ccejsn6dcbfa47797f',
            'x-rapidapi-host': 'euribor.p.rapidapi.com',
          },
        });

        const euriborData: EuriborData = {
          threeM: parseFloat(response.data['3m']), 
          sixM: parseFloat(response.data['6m']),
          twelveM: parseFloat(response.data['12m']),
        };

        dispatch(setEuribor(euriborData));

        localStorage.setItem('euriborFetchTime', Date.now().toString());
        localStorage.setItem('euribor', JSON.stringify(euriborData));
      } catch (error) {
        console.error('Error fetching Euribor data: ', error);
      }
    };

    const shouldFetchEuribor = () => {
      const savedFetchTime = localStorage.getItem('euriborFetchTime');

      if (!savedFetchTime) return true;

      const lastFetch = parseInt(savedFetchTime, 10);
      const currentTime = Date.now();
      const diffInDays = (currentTime - lastFetch) / (1000 * 60 * 60 * 24);

      return diffInDays > 31;
    };

    if (shouldFetchEuribor()) {
      fetchEuriborData();
    }
  }, [dispatch]);

  return <EuriborContainer euribor={euribor} />;
};

export default EuriborController;
