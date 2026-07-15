import { useState } from "react";

import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
    Divider
} from "@mui/material";

import toast from "react-hot-toast";

import api from "../services/api";

function AIChat() {

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState(null);

    const handleGenerate = async () => {

        if (!message.trim()) {

            toast.error("Please enter interaction details");

            return;
        }

        setLoading(true);

        try {

            const res = await api.post("/agent/save-chat", {
                message
            });

            setResponse(res.data);

            toast.success("Interaction Saved Successfully");

            setMessage("");

        } catch (err) {

            console.log(err);

            toast.error("AI Request Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Paper
            sx={{
                p: 4,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h5"
                sx={{
                    mb: 2,
                    fontWeight: 700
                }}
            >
                AI Conversation
            </Typography>

            <Typography
                sx={{
                    mb: 3,
                    color: "gray"
                }}
            >
                Describe your meeting naturally. AI will extract important
                details, generate a summary and save the interaction.
            </Typography>

            <TextField
                multiline
                rows={8}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Example:

Met Dr Sharma today.

Hospital: Ruby Hall

Discussed CardioPlus.

Doctor showed interest.

Requested dosage information.

Follow up after two weeks.`}
            />

            <Button
                variant="contained"
                sx={{
                    mt: 3
                }}
                onClick={handleGenerate}
                disabled={loading}
            >
                {
                    loading
                        ?
                        <CircularProgress
                            size={24}
                            color="inherit"
                        />
                        :
                        "Generate & Save Interaction"
                }
            </Button>

            {

                response && (

                    <Paper
                        elevation={2}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 3,
                            bgcolor: "#F8FAFC"
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                color: "#16A34A",
                                fontWeight: 700,
                                mb: 2
                            }}
                        >
                            ✅ Interaction Saved Successfully
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Typography sx={{ mb: 2 }}>
                            <strong>Doctor Name</strong>
                            <br />
                            {response.doctor_name}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                            <strong>Hospital</strong>
                            <br />
                            {response.hospital}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                            <strong>Specialization</strong>
                            <br />
                            {response.specialization}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                            <strong>Products Discussed</strong>
                            <br />
                            {response.products_discussed}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                            <strong>Summary</strong>
                            <br />
                            {response.summary}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                            <strong>Sentiment</strong>
                            <br />
                            {response.sentiment}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                            <strong>Follow Up</strong>
                            <br />
                            {response.follow_up}
                        </Typography>

                        <Typography sx={{ mb: 2 }}>
                            <strong>Interaction Date</strong>
                            <br />
                            {response.interaction_date}
                        </Typography>

                    </Paper>

                )

            }

        </Paper>

    );

}

export default AIChat;