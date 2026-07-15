import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {

    return (

        <Box
            sx={{
                display: "flex",
                width: "100%",
                minHeight: "100vh",
                overflow: "hidden"
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    background: "#F5F7FB",
                    minWidth: 0
                }}
            >

                <Navbar />

                <Box
                    sx={{
                        flex: 1,
                        p: 4,
                        overflow: "auto"
                    }}
                >
                    {children}
                </Box>

            </Box>

        </Box>

    );

}