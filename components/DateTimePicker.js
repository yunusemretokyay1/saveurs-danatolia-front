import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Tarih ve saat seçim alanlarının stil ayarları
const DateTimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TimeSelect = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function DateTimePicker({ selectedDateTime, onChange }) {
    const handleDateChange = (date) => {
        onChange(prev => ({ ...prev, date }));
    };

    const handleTimeChange = (event) => {
        onChange(prev => ({ ...prev, time: event.target.value }));
    };

    return (
        <DateTimePickerContainer>
            <DatePicker
                selected={selectedDateTime.date}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Sélectionnez une date"
            />
            <TimeSelect
                type="time"
                value={selectedDateTime.time}
                onChange={handleTimeChange}
                min="07:30"
                max="20:30"
            />
        </DateTimePickerContainer>
    );
}
