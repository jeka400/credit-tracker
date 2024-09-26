import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "../../../styles/Add.css";

interface ISuccessErrorModalProps {
  show: boolean;
  title: string;
  message: string;
  onHide: () => void;
}

const SuccessErrorModal: React.FC<ISuccessErrorModalProps> = ({ show, title, message, onHide }) => {
  return (
    <Modal show={ show } onHide={ onHide }>
      <Modal.Header closeButton>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>

      <Modal.Body>{ message }</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={ onHide }>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessErrorModal;
