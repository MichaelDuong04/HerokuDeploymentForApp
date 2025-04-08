import React, { useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';

function HardwareSet({ hardware, projectJoined, onHardwareUpdate }) {
  const [quantity, setQuantity] = useState(1);

  const handleCheckOut = () => {
    const qty = parseInt(quantity, 10) || 1;
    if (hardware.checkedOut + qty <= hardware.available) {
      onHardwareUpdate(hardware.name, qty);
    }
  };

  const handleCheckIn = () => {
    const qty = parseInt(quantity, 10) || 1;
    if (hardware.checkedOut - qty >= 0) {
      onHardwareUpdate(hardware.name, -qty);
    }
  };

  const handleInputChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <Typography variant="subtitle1">
        {hardware.name} - {hardware.available} available, {hardware.checkedOut} checked out
      </Typography>
      {projectJoined && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
          <TextField 
            type="number" 
            value={quantity} 
            onChange={handleInputChange} 
            inputProps={{ min: 1 }} 
            size="small"
            sx={{ width: '80px', mr: 1 }}
          />
          <Button 
            variant="outlined" 
            onClick={handleCheckOut} 
            disabled={hardware.checkedOut + (parseInt(quantity, 10) || 1) > hardware.available}
            sx={{ mr: 1 }}
          >
            Check Out
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleCheckIn} 
            disabled={hardware.checkedOut - (parseInt(quantity, 10) || 1) < 0}
          >
            Check In
          </Button>
        </div>
      )}
    </div>
  );
}

export default HardwareSet;
