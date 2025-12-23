import React from "react";
import data from '../../Data/FilterData'
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Collapse,
    Divider,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const filters = [
    {
        label: "Course",
        type: "autocomplete",
        options: data.courses,
        require: true
    },
    {
        label: "Country",
        type: "autocomplete",
        options: data.Country,
        required: true
    },
    {
        label: "Intake",
        type: "checkbox",
        options: data.intake,
        required: true
    },
    {
        label: "Price",
        type: "select",
        options: ["< 1000", "1000-5000", "5000-10000", "> 10000"],
        required: true
    },
    {
        label: "Ranking",
        type: "select",
        options: ["< 50", "50 - 80", "80 - 90", "> 90-100"],
        required: true
    },
];

const AdvanceSearch = () => {
    const [openFilters, setOpenFilters] = React.useState({});
    const [filterValues, setFilterValues] = React.useState({});

    const handleToggleFilter = (filterLabel) => {
        setOpenFilters((prevOpenFilters) => ({
            ...prevOpenFilters,
            [filterLabel]: !prevOpenFilters[filterLabel]
        }));
    };

    const handleFilterChange = (event) => {
        setFilterValues((prevFilterValues) => ({
            ...prevFilterValues,
            [event.target.name]: event.target.value
        }));
    };

    const handleAutocompleteChange = (event, value, filterLabel) => {
        setFilterValues((prevFilterValues) => ({
            ...prevFilterValues,
            [filterLabel]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        setFilterValues((prevFilterValues) => ({
            ...prevFilterValues,
            [event.target.name]: event.target.checked
                ? [...(prevFilterValues[event.target.name] || []), event.target.value]
                : prevFilterValues[event.target.name].filter(
                    (value) => value !== event.target.value
                )
        }));
    };

    const handleResetAll = () => {
        setOpenFilters({});
        setFilterValues({});
    };

    return (
        <Box sx={{ bgcolor: "#fff", borderRadius: "12px", width: "100%", p: "20px" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Box fontSize="h6.fontSize" fontWeight="bold">
                    Filters
                </Box>
                <Button variant="text" color="primary" onClick={handleResetAll}>
                    Reset All
                </Button>
            </Box>
            <List>
                {filters.map((filter, index) => (
                    <React.Fragment key={filter.label}>
                        <ListItem button onClick={() => handleToggleFilter(filter.label)}>
                            <ListItemText primary={filter.label} />
                            {openFilters[filter.label] ? (
                                <Remove sx={{ color: filter.required ? "red" : undefined }} />
                            ) : (
                                <Add sx={{ color: filter.required ? "red" : undefined }} />
                            )}
                        </ListItem>
                        <Collapse
                            in={openFilters[filter.label]}
                            timeout="auto"
                            unmountOnExit
                        >
                            {filter.type === "autocomplete" && (
                                <ListItem sx={{ pl: 4 }}>
                                    <Autocomplete
                                        options={filter.options}
                                        filterOptions={() => filter.options}
                                        renderInput={(params) => (
                                            <TextField {...params} label={filter.label} fullWidth />
                                        )}
                                        onChange={(event, value) =>
                                            handleAutocompleteChange(event, value, filter.label)
                                        }
                                        sx={{
                                            width: "100%",
                                            "& .MuiOutlinedInput-root": {
                                                border: "none"
                                            }
                                        }}
                                    />
                                </ListItem>
                            )}
                            {filter.type === "select" && (
                                <ListItem sx={{ pl: 4 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>{filter.label}</InputLabel>
                                        <Select
                                            label={filter.label}
                                            name={filter.label}
                                            value={filterValues[filter.label] || ""}
                                            onChange={handleFilterChange}
                                        >
                                            {filter.options.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </ListItem>
                            )}
                            {filter.type === "checkbox" && (
                                <List component="div" disablePadding>
                                    {filter.options.map((option) => (
                                        <ListItem key={option} button sx={{ pl: 4 }}>
                                            <Checkbox
                                                checked={
                                                    (Array.isArray(filterValues[filter.label]) &&
                                                        filterValues[filter.label].includes(option)) ||
                                                    false
                                                }
                                                onChange={handleCheckboxChange}
                                                name={filter.label}
                                                value={option}
                                                sx={{
                                                    "&.Mui-checked": {
                                                        color: "red"
                                                    }
                                                }}
                                            />
                                            <ListItemText primary={option} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Collapse>
                        {index < filters.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
            <Box margin="auto" width="full" display="flex" justifyContent="center" borderTop= "1px #ccc solid" padding="30px 0">
            <button className='py-2 w-52 lg:w-32 items-center border-2 border-black rounded-lg bg-sky-500 text-white cursor-pointer' onClick={e => {
                       
                    }}>Filter</button>
            </Box>
        </Box>
    );
};


export default AdvanceSearch