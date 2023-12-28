"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BasicGrid = () => {
    const [shipmentValue, setShipmentValue] = useState("");
    const [licensePlateValue, setLicensePlateValue] = useState("");
    const [sourceValue, setSourceValue] = useState("");
  
    const handleShipmentChange = (event) => {
      setShipmentValue(event.target.value);
    };
  
    const handleLicensePlateChange = (event) => {
      setLicensePlateValue(event.target.value);
      // Optionally, you can uncomment the next line if you want to disable "Shipment" when there's input in "License Plate"
      // setShipmentValue("");
    };
  
    const handleSourceChange = (event) => {
      setSourceValue(event.target.value);
      // Optionally, you can uncomment the next line if you want to disable "Shipment" when there's input in "Source"
      // setShipmentValue("");
    };
  
    const isShipmentDisabled = Boolean(licensePlateValue || sourceValue);
    const isFieldsDisabled = Boolean(shipmentValue);
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
            >
              <TextField
                id="shipment"
                label="Shipment"
                variant="outlined"
                onChange={handleShipmentChange}
                disabled={isShipmentDisabled}
              />
              <TextField
                id="licenseplate"
                label="License Plate"
                variant="outlined"
                onChange={handleLicensePlateChange}
                disabled={isFieldsDisabled}
              />
              <TextField
                id="source"
                label="Source"
                variant="outlined"
                onChange={handleSourceChange}
                disabled={isFieldsDisabled}
              />
              <TextField
                id="destination"
                label="Destination"
                variant="outlined"
              />
              <Button variant="contained" type="submit">
                search
              </Button>
            </Box>
          </Grid>
          <Grid xs={12}></Grid>
        </Grid>
      </Box>
    );
};
export default BasicGrid;
