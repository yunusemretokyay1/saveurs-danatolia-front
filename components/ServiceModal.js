import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import DriveIcon from "@/components/icons/DriveIcon";
import TruckDelivery from "@/components/icons/TruckDelivery";
import TruckIcon from "@/components/icons/TruckIcon";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Modal stilleri
const StyledModal = styled(Modal)`
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

// Buton stilleri
const Button = styled.button`
  margin: 10px 0;
  padding: 8px 15px; /* Küçük boyutlar için padding ayarlandı */
  border: none;
  border-radius: 5px;
  background-color: #0D3D29;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f4c; /* Daha açık bir yeşil ton */
  }

  &:disabled {
    background-color: #ccc; /* Disabled durumda soluk renk */
    cursor: not-allowed;
  }
`;

// Hizmet seçenekleri stilleri
const ServiceOption = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;

  svg {
    margin-right: 10px; /* İkon ve metin arasında boşluk */
  }

  &:hover {
    color: #0D3D29; /* Hover durumunda renk değişimi */
  }
`;

// Lokasyon seçimi stilleri
const LocationSelect = styled.select`
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const ServiceModal = ({ isOpen, onRequestClose, onServiceSelect }) => {
  const [dateTime, setDateTime] = useState(null);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState(''); // Lokasyon durumu

  const handleServiceSelect = (service) => {
    if (!dateTime || !time || !location) {
      alert("Please select a date, time, and location.");
      return; // Tarih, saat veya lokasyon seçilmemişse uyarı göster
    }

    onServiceSelect({
      ...service,
      location, // Seçilen lokasyon
      dateTime, // Seçilen tarih
      time // Seçilen saat
    });
    onRequestClose();
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Select a Service</h2>

      {/* Lokasyon Seçimi */}
      <LocationSelect value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Sélectionnez un emplacement</option>
        <option value="Thonon-les-Bains">Thonon-les-Bains</option>
        <option value="Evian-les-Bains">Evian-les-Bains</option>
        <option value="Amphion-les-Bains">Amphion-les-Bains</option>
        <option value="Sciez">Sciez</option>
        <option value="Douvaine">Douvaine</option>
        <option value="Anthy-sur-Léman">Anthy-sur-Léman</option>
        <option value="Margencel">Margencel</option>
      </LocationSelect>

      <ServiceOption onClick={() => handleServiceSelect({ service: 'Delivery', location })}>
        <TruckDelivery />
        Delivery to your home
      </ServiceOption>
      <ServiceOption onClick={() => handleServiceSelect({ service: 'Pickup', location })}>
        <DriveIcon />
        Pickup from store
      </ServiceOption>
      <ServiceOption onClick={() => handleServiceSelect({ service: 'In-House', location })}>
        <TruckIcon />
        In-house service
      </ServiceOption>

      <DatePicker
        selected={dateTime}
        onChange={(date) => setDateTime(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <Button onClick={() => handleServiceSelect({ service: 'Delivery', location })}>
        Confirm Service
      </Button>
      <Button onClick={onRequestClose}>Close</Button>
    </StyledModal>
  );
};

export default ServiceModal;
