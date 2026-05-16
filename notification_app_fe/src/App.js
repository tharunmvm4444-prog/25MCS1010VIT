import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const data = [
      {
        id: 1,
        type: "Placement",
        message: "Google hiring",
        timestamp: "2026-04-22 17:51:18",
        read: false,
      },
      {
        id: 2,
        type: "Result",
        message: "Mid sem results",
        timestamp: "2026-04-22 17:50:54",
        read: true,
      },
      {
        id: 3,
        type: "Event",
        message: "Tech fest",
        timestamp: "2026-04-21 11:30:00",
        read: false,
      },
      {
        id: 4,
        type: "Placement",
        message: "Microsoft hiring",
        timestamp: "2026-04-20 10:00:00",
        read: false,
      },
    ];

    setNotifications(data);
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Notification System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Box sx={{ marginBottom: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>

            <Select
              value={filter}
              label="Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredNotifications.map((notification) => (
            <Grid item xs={12} md={6} key={notification.id}>
              <Card
                sx={{
                  backgroundColor: notification.read
                    ? "#f5f5f5"
                    : "#e3f2fd",
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {notification.message}
                  </Typography>

                  <Chip
                    label={notification.type}
                    sx={{ marginTop: 1 }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ marginTop: 2 }}
                  >
                    {notification.timestamp}
                  </Typography>

                  {!notification.read && (
                    <Typography
                      color="primary"
                      sx={{ marginTop: 1 }}
                    >
                      Unread
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;