import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: "white",
                color: "#111827",
                borderBottom: "1px solid #E5E7EB"
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600
                    }}
                >
                    AI First CRM
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;