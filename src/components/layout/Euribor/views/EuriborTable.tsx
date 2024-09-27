import React from 'react';
import { Table } from 'react-bootstrap';
import { EuriborData } from '../models/euriborModel';
import "../../../../styles/Euribor.css";

interface IEuriborTableProps {
  euribor: EuriborData;
}

const EuriborTable: React.FC<IEuriborTableProps> = ({ euribor }) => {
  return (
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
  );
};

export default EuriborTable;
