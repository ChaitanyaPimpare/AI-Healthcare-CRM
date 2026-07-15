import { Card, CardContent, Typography, Box } from "@mui/material";

function StatsCard({ title, value, color }) {
    return (
        <Card
            elevation={2}
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        {value}
                    </Typography>

                    <Box
                        sx={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            bgcolor: color
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

export default StatsCard;