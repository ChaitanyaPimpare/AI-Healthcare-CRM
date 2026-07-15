import { useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  Box,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

import api from "../../services/api";

export default function AIAssistantPanel() {

  const [message, setMessage] = useState("");

  const [chatHistory, setChatHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const [insightLoading, setInsightLoading] = useState(false);

  const [insights, setInsights] = useState({
  summary: "",
  doctor: "",
  hospital: "",
  products: [],
  sentiment: "",
  follow_up: "",
});

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setChatHistory((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await api.post("/agent/chat", {
        message,
      });

      const aiMessage = {
    role: "assistant",
    content:
        response.data.response ||
        "No response received.",
};

      setChatHistory((prev) => [
        ...prev,
        aiMessage,
      ]);

      setMessage("");

    } catch (err) {

      setChatHistory((prev)=>[
        ...prev,
        {
          role:"assistant",
          content:"Unable to connect to AI."
        }
      ]);

    } finally {

      setLoading(false);

    }

  };

  const generateInsights = async () => {

    if(chatHistory.length===0) return;

    setInsightLoading(true);

    try{

      const fullConversation = chatHistory
    .map(item => item.content)
    .join("\n");

const response = await api.post(
    "/agent/save-chat",
    {
        message: fullConversation
    }
);

setInsights(response.data);

setAiInsights(response.data);



    }

    catch(err){

      console.log(err);

    }

    finally{

      setInsightLoading(false);

    }

  };

  return (

    <Paper
      elevation={0}
      sx={{
        borderRadius:4,
        p:3,
        height:"100%",
        display:"flex",
        flexDirection:"column",
        boxShadow:"0 4px 20px rgba(0,0,0,.08)"
      }}
    >

      <Typography
        variant="h5"
        fontWeight={700}
      >
        AI Assistant
      </Typography>

      <Typography
        color="text.secondary"
        sx={{mt:1}}
      >
        Chat with AI to automatically generate interaction insights.
      </Typography>

      <Divider sx={{my:3}} />

      {/* Chat Area */}

      <Box

        sx={{

          flex:1,

          overflowY:"auto",

          minHeight:350,

          maxHeight:420,

          background:"#F8FAFC",

          borderRadius:3,

          p:2,

          border:"1px solid #E5E7EB"

        }}

      >

      {

        chatHistory.length===0 && (

          <Box
            sx={{
              height:"100%",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column",
              color:"gray"
            }}
          >

            <PsychologyIcon
              sx={{
                fontSize:60,
                mb:2,
                color:"#2563EB"
              }}
            />

            <Typography>

              Start a conversation with AI...

            </Typography>

          </Box>

        )

      }

      {

        chatHistory.map((chat,index)=>(

          <Box

            key={index}

            sx={{

              display:"flex",

              justifyContent:
              chat.role==="user"
              ? "flex-end"
              : "flex-start",

              mb:2

            }}

          >

            <Box

              sx={{

                maxWidth:"80%",

                p:2,

                borderRadius:3,

                bgcolor:
                chat.role==="user"
                ? "#2563EB"
                : "#fff",

                color:
                chat.role==="user"
                ? "#fff"
                : "#000",

                border:
                chat.role==="assistant"
                ? "1px solid #E5E7EB"
                : "none"

              }}

            >

              <Box
                sx={{
                  display:"flex",
                  alignItems:"center",
                  gap:1,
                  mb:1
                }}
              >

                {

                  chat.role==="user"

                  ?

                  <PersonIcon fontSize="small"/>

                  :

                  <SmartToyIcon fontSize="small"/>

                }

                <Typography
                  fontWeight={600}
                  fontSize={13}
                >

                  {

                    chat.role==="user"

                    ?

                    "You"

                    :

                    "AI"

                  }

                </Typography>

              </Box>

              <Typography>

                {chat.content}

              </Typography>

            </Box>

          </Box>

        ))

      }

      </Box>


            {/* Chat Input */}

      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask AI about this interaction..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              sendMessage();
            }
          }}
        />

        <IconButton
          color="primary"
          onClick={sendMessage}
          disabled={loading}
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: "#2563EB",
            color: "#fff",
            "&:hover": {
              bgcolor: "#1D4ED8",
            },
          }}
        >
          {loading ? (
            <CircularProgress
              size={22}
              sx={{ color: "#fff" }}
            />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Box>

      {/* Generate Insights */}

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          height: 48,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 600,
        }}
        onClick={generateInsights}
        disabled={insightLoading || chatHistory.length === 0}
      >
        {insightLoading
          ? "Generating..."
          : "Generate AI Insights"}
      </Button>

      {/* Insights */}

      {insights.summary && (
        <Box sx={{ mt: 3 }}>

          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
          >
            AI Insights
          </Typography>

          {/* Summary */}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              fontWeight={600}
              gutterBottom
            >
              Summary
            </Typography>

            <Typography color="text.secondary">
              {insights.summary}
            </Typography>
          </Paper>

          {/* Doctor */}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
            }}
          >
            <Typography fontWeight={600}>
              Doctor
            </Typography>

            <Typography color="text.secondary">
              {insights.doctor || "-"}
            </Typography>
          </Paper>

          {/* Hospital */}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
            }}
          >
            <Typography fontWeight={600}>
              Hospital
            </Typography>

            <Typography color="text.secondary">
              {insights.hospital || "-"}
            </Typography>
          </Paper>

          {/* Products */}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              fontWeight={600}
              gutterBottom
            >
              Products Mentioned
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {(insights.products || []).map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>

          {/* Sentiment */}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
            }}
          >
            <Typography fontWeight={600}>
              Sentiment
            </Typography>

            <Typography color="text.secondary">
              {insights.sentiment || "-"}
            </Typography>
          </Paper>

          {/* Follow Up */}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 3,
            }}
          >
            <Typography fontWeight={600}>
              Follow-up
            </Typography>

            <Typography color="text.secondary">
              {insights.follow_up || "-"}
            </Typography>
          </Paper>

          {/* Suggested Actions */}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              fontWeight={600}
              gutterBottom
            >
              Suggested Actions
            </Typography>

            <Typography sx={{ mb: 1 }}>
              ✅ Schedule Follow-up Meeting
            </Typography>

            <Typography sx={{ mb: 1 }}>
              ✅ Share Clinical Research Paper
            </Typography>

            <Typography sx={{ mb: 1 }}>
              ✅ Send Product Brochure
            </Typography>

            <Typography>
              ✅ Arrange Product Demonstration
            </Typography>
          </Paper>

        </Box>
      )}

    </Paper>

  );

}