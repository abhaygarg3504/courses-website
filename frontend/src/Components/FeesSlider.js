/* eslint-disable no-alert, no-console */

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 25000,
    label: "25000",
  },
  {
    value: 50000,
    label: "50000",
  },
  {
    value: 75000,
    label: "75000",
  },
  {
    value: 100000,
    label: "100000",
  },
];

const PrettoSlider = styled(Slider)({
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "transparent",
    color: "red",
  },
});

function calculateValue(value) {
  return value;
}

export default function NonLinearSlider(props) {
  const [value, setValue] = React.useState(100000);

  React.useEffect(() => {
    setValue(100000)
  }, [props.value]);

  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  function valueLabelFormat(value) {
    props.onChange(value);
    return `${value}`;
  }

  return (
    <Box sx={{ width: "100%", margin: "auto" }}>
      <Typography
        id="non-linear-slider"
        gutterBottom
        sx={{ margin: "4px 0px 30px 0px", fontWeight: 800 }}
        className="bg-sky-600 px-4 font-semibold text-white py-1 mb-6"
      >
        Yearly Tution Fees: {`< ` + valueLabelFormat(calculateValue(value))}
      </Typography>
      <PrettoSlider
        value={value}
        min={0}
        step={1}
        max={100000}
        marks={marks}
        scale={calculateValue}
        sx={{width : "95%"}}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-label="pretto slider"
      />
    </Box>
  );
}
