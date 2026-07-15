import { useEffect, useState } from "react";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box
} from "@mui/material";

import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";

import api from "../services/api";

function Dashboard() {
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInteractions();
    }, []);

    const loadInteractions = async () => {
        try {
            const response = await api.get("/interactions");

            setInteractions(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const totalInteractions = interactions.length;

    const today = new Date().toISOString().split("T")[0];

    const todayMeetings = interactions.filter(
        (item) => item.interaction_date === today
    ).length;

    const pendingFollowUps = interactions.filter(
        (item) => item.follow_up
    ).length;

    return (
      <>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 3
                }}
            >
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <StatsCard
                        title="Total Interactions"
                        value={totalInteractions}
                        color="#2563EB"
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <StatsCard
                        title="Today's Meetings"
                        value={todayMeetings}
                        color="#10B981"
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <StatsCard
                        title="Pending Follow Ups"
                        value={pendingFollowUps}
                        color="#F59E0B"
                    />
                </Grid>
            </Grid>

            <Card
                sx={{
                    mt: 4,
                    borderRadius: 3
                }}
            >
                <CardContent>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            fontWeight: 600
                        }}
                    >
                        Recent Interactions
                    </Typography>

                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 4
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : interactions.length === 0 ? (
                        <Typography>
                            No interactions found.
                        </Typography>
                    ) : (
                        interactions.slice(0, 5).map((item) => (
                            <Card
                                key={item.id}
                                variant="outlined"
                                sx={{
                                    mb: 2,
                                    borderRadius: 2
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600
                                        }}
                                    >
                                        {item.doctor_name}
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {item.hospital}
                                    </Typography>

                                    <Typography sx={{ mt: 1 }}>
                                        {item.summary}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontSize: 13,
                                            color: "#2563EB"
                                        }}
                                    >
                                        Follow-up: {item.follow_up}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </CardContent>
            </Card>
       </>
    );
}

export default Dashboard;