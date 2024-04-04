

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Link,
  Checkbox,
  IconButton,
  createTheme,
  Alert,
  AlertTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { postTask } from "../redux/authReducer/action";
import { useLocation, useNavigate } from "react-router-dom";
// Assuming you have your default theme defined in a separate file

const defaultTheme = createTheme();
const TaskInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertComponent, setAlertComponent] = React.useState(null);
  const location = useLocation()

  useEffect(()=>{
    navigate(location.state , {replace:true})
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      // If any of the fields is empty, display an error message
      const alertComponent = (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setAlertComponent(null)}
        >
          <AlertTitle>Error</AlertTitle>
          Please fill in all the fields.
        </Alert>
      );
      setAlertComponent(alertComponent);
      setTimeout(() => {
        setAlertComponent(null);
      }, 2000); // Adjust the timeout duration as needed
      return; // Prevent further execution of the handleSubmit function
    }

    const taskData = {
      title,
      description,
    };

    dispatch(postTask(taskData))
      .then(() => {
        console.log("Login Succesfull");
        const alertComponent = (
          <Alert
            variant="filled"
            severity="success"
            onClose={() => setAlertComponent(null)}
          >
            <AlertTitle>Task Added Succesfully!!</AlertTitle>
            <strong>Redirecting you to TaskList</strong>
          </Alert>
        );
        setAlertComponent(alertComponent);
        setTimeout(() => {
          navigate("/usertask");
        }, 1000);
      })
      .catch((err) => {
        const alertComponent = (
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setAlertComponent(null)}
          >
            <AlertTitle>Error</AlertTitle>
            {err.response.data.msg}
          </Alert>
        );
        setAlertComponent(alertComponent);
        setTimeout(() => {
          setAlertComponent(null);
        }, 1000);
      });
  };

  return (
    <>
      {" "}
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Task
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid
                container
                spacing={2}
                justifyContent={"center"}
                alignItems="center"
              >
                {/* <Grid item xs={1}>
              <Checkbox />
            </Grid> */}
                <Grid item xs={10}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="task-text"
                    label="Task"
                    autoFocus
                    //   defaultValue={task.text}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="task-text"
                    label="Description"
                    autoFocus
                    rows={"8"}
                    multiline={true}
                    //   defaultValue={task.text}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Grid>
                {/* <Grid item xs={1}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Grid> */}
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Create Task
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {alertComponent && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "50px",
            transform: "-moz-initial",
            zIndex: 9999,
          }}
        >
          {alertComponent}
        </div>
      )}
    </>
  );
};

export default TaskInput;
