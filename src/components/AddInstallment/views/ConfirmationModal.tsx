import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "../../../styles/Add.css";

interface IConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={ show } onHide={ onHide }>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        A installment already exists for this month and year. Do you want to add new?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={ onConfirm }>Yes</Button>
        <Button variant="danger" onClick={ onHide }>No</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
