// components/ServiceModal.js
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import DriveIcon from "@/components/icons/DriveIcon";
import TruckDelivery from "@/components/icons/TruckDelivery";
import TruckIcon from "@/components/icons/TruckIcon";

const ModalContainer = styled(Modal)`
  background-color: white;
  border-radius: 8px;
  padding: 40px;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #0D3D29;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;

const ServiceModal = ({ isOpen, onRequestClose, onServiceSelect }) => {
  const handleServiceSelect = (service) => {
    onServiceSelect(service);
    onRequestClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>Comment souhaitez-vous faire vos courses aujourd’hui ?</h2>
      <Button onClick={() => handleServiceSelect('Drive')}><DriveIcon />Drive</Button>
      <Button onClick={() => handleServiceSelect('Livraison')}><TruckDelivery />Livraison</Button>
      <Button onClick={() => handleServiceSelect('Livraison Express')}><TruckIcon />Livraison Express</Button>
      <Button onClick={onRequestClose}>Fermer</Button>
    </ModalContainer>
  );
};

export default ServiceModal;
