import React from 'react';
import { Container } from 'react-bootstrap';
import EuriborTable from './EuriborTable';
import { EuriborData } from '../models/euriborModel';
import "../../../styles/Euribor.css";

interface IEuriborContainerProps {
  euribor: EuriborData;
}

const EuriborContainer: React.FC<IEuriborContainerProps> = ({ euribor }) => {
  return (
    <Container id="euribor">
      <EuriborTable euribor={ euribor } />
    </Container>
  );
};

export default EuriborContainer;
