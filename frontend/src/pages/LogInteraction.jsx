import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

import InteractionForm from "../components/InteractionForm";
import AIAssistantPanel from "../components/interaction/AIAssistantPanel";

function LogInteraction() {
  const [interactionData, setInteractionData] = useState({
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
  });

  const [aiInsights, setAiInsights] = useState(null);

  const now = new Date();

  const currentDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
      }}
    >
      {/* Header */}

      <Paper
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 4,
          p: 4,
          background: "#ffffff",
          boxShadow: "0 6px 24px rgba(0,0,0,.08)",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              Log HCP Interaction
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#64748B",
                fontSize: 16,
              }}
            >
              Record every Healthcare Professional interaction with
              AI-powered assistance.
            </Typography>
          </Grid>

          <Grid
            size={{ xs: 12, md: 4 }}
          >
            <Box
              sx={{
                textAlign: {
                  xs: "left",
                  md: "right",
                },
              }}
            >
              <Typography fontWeight={600}>
                {currentDate}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {currentTime}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}

      <Grid
        container
        spacing={3}
        alignItems="stretch"
      >
        {/* Left */}

        <Grid
          size={{
            xs: 12,
            lg: 7,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 3,
              height: "100%",
              boxShadow:
                "0 6px 24px rgba(0,0,0,.08)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              Interaction Details
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#64748B",
              }}
            >
              Capture complete details about your HCP meeting.
            </Typography>

            <Divider
              sx={{
                my: 3,
              }}
            />

            <InteractionForm
              formData={interactionData}
              setFormData={setInteractionData}
              aiInsights={aiInsights}
            />
          </Paper>
        </Grid>

        {/* Right */}

        <Grid
          size={{
            xs: 12,
            lg: 5,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 3,
              height: "100%",
              minHeight: 850,
              display: "flex",
              flexDirection: "column",
              boxShadow:
                "0 6px 24px rgba(0,0,0,.08)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              AI Assistant
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#64748B",
              }}
            >
              Chat with AI and automatically generate interaction
              insights.
            </Typography>

            <Divider
              sx={{
                my: 3,
              }}
            />

            <Box
              sx={{
                flex: 1,
                display: "flex",
              }}
            >
              <AIAssistantPanel
                formData={interactionData}
                setFormData={setInteractionData}
                setAiInsights={setAiInsights}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LogInteraction;