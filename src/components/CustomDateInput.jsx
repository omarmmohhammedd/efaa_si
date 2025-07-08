import *  as React from "react";
import { TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const CustomDateInput = ({setBirthday}) => {
  const [localBirthday, setLocalBirthday] = React.useState(null);

  const handleChange = (newValue) => {
    setLocalBirthday(newValue);
    setBirthday(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "50%" ,padding:'0 0 !important',zIndex:'1'}}  >
        <DatePicker
          label="تاريخ الميلاد"
          value={localBirthday}
          // onChange={(e) => setBirthday(new Date(e.getDate()))}
          onChange={handleChange}
          slotProps={{
            textField: {
              placeholder: "تاريخ الميلاد",
              inputProps: {
                style: {
                  textAlign: "center",
                  direction: "rtl",
                  backgroundColor: "white",
                  fontSize: "12px",
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
