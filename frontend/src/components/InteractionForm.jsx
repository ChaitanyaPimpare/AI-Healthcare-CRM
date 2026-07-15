import { useState } from "react";

import {
  Paper,
  Typography,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import api from "../services/api";

const interactionTypes = [
  "Face to Face",
  "Video Call",
  "Phone Call",
  "Email",
  "Conference",
  "Workshop",
];

const sentiments = [
  "Positive",
  "Neutral",
  "Negative",
];

const initialState = {
  doctor_name: "",
  interaction_type: "",
  interaction_date: "",
  interaction_time: "",
  hospital: "",
  specialization: "",
  attendees: "",
  topics_discussed: "",
  materials_shared: "",
  sentiment: "",
  outcome: "",
  follow_up_required: false,
};

export default function InteractionForm() {

  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const validateForm = () => {

    if (!formData.doctor_name.trim())
      return "Doctor name is required.";

    if (!formData.interaction_type)
      return "Select interaction type.";

    if (!formData.interaction_date)
      return "Select interaction date.";

    if (!formData.hospital.trim())
      return "Hospital is required.";

    return "";
  };

  const handleSave = async () => {

    const error = validateForm();

    if (error) {

      setSnackbar({
        open: true,
        severity: "error",
        message: error,
      });

      return;
    }

    try {

      setLoading(true);

      await api.post("/interactions", formData);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Interaction saved successfully.",
      });

      setFormData(initialState);

    } catch (err) {

      setSnackbar({
        open: true,
        severity: "error",
        message:
          err?.response?.data?.detail ||
          "Unable to save interaction.",
      });

    } finally {

      setLoading(false);

    }

  };

  return (

    <Paper
      elevation={0}
      sx={{
        borderRadius:4,
        p:4,
        boxShadow:"0 4px 20px rgba(0,0,0,.08)"
      }}
    >

      <Typography
        variant="h5"
        fontWeight={700}
      >
        Interaction Details
      </Typography>

      <Typography
        color="text.secondary"
        sx={{mt:1}}
      >
        Record every discussion with the healthcare professional.
      </Typography>

      <Divider sx={{my:3}} />

      <Grid
        container
        spacing={2.5}
      >

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="HCP Name"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Interaction Type"
            name="interaction_type"
            value={formData.interaction_type}
            onChange={handleChange}
          >
            {interactionTypes.map(type=>(
              <MenuItem
                key={type}
                value={type}
              >
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            name="interaction_date"
            value={formData.interaction_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink:true
            }}
            label="Interaction Date"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="time"
            name="interaction_time"
            value={formData.interaction_time}
            onChange={handleChange}
            InputLabelProps={{
              shrink:true
            }}
            label="Interaction Time"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Sentiment"
            name="sentiment"
            value={formData.sentiment}
            onChange={handleChange}
          >
            {sentiments.map(item=>(
              <MenuItem
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
                {/* Topics Discussed */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Topics Discussed"
            name="topics_discussed"
            value={formData.topics_discussed}
            onChange={handleChange}
            placeholder="Discuss products, patient cases, clinical studies, objections..."
          />
        </Grid>

        {/* Materials Shared */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Materials Shared"
            name="materials_shared"
            value={formData.materials_shared}
            onChange={handleChange}
            placeholder="Product brochure, clinical paper, samples..."
          />
        </Grid>

        {/* Outcome */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Outcome"
            name="outcome"
            value={formData.outcome}
            onChange={handleChange}
            placeholder="Describe the result of the interaction..."
          />
        </Grid>

        {/* Follow-up */}

        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              border: "1px solid #E5E7EB",
              borderRadius: 3,
              background: "#FAFAFA",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.follow_up_required}
                  onChange={handleChange}
                  name="follow_up_required"
                />
              }
              label="Follow-up Required"
            />
          </Box>
        </Grid>

        {/* Save Button */}

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<SaveIcon />}
            disabled={loading}
            onClick={handleSave}
            sx={{
              height: 52,
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {loading
              ? "Saving..."
              : "Save Interaction"}
          </Button>
        </Grid>

      </Grid>

      {/* Snackbar */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Paper>

  );

}