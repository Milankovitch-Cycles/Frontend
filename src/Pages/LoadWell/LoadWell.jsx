import React, { useState } from "react";
import { Navbar } from "../../components";
import {
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LoadWell = () => {
  const [wellName, setWellName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [lasFile, setLasFile] = useState(null);
  const [lasFilePreview, setLasFilePreview] = useState(null);
  const [hoverImage, setHoverImage] = useState(false);
  const [hoverFile, setHoverFile] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [wellNameError, setWellNameError] = useState(false);
  const [lasFileError, setLasFileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dataAuthentication = useSelector((state) => state.authToken);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const handleLasFileChange = (e) => {
    const file = e.target.files[0];
    setLasFile(file);
    setLasFilePreview(file.name);
    setLasFileError(false);
  };
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };
  const handleRemoveLasFile = () => {
    setLasFile(null);
    setLasFilePreview(null);
  };
  const handleWellNameChange = (e) => {
    setWellName(e.target.value);
    if (wellNameError) {
      setWellNameError(false);
    }
  };

  const handleSubmit = async () => {
    const token = dataAuthentication.access_token;
    let valid = true;

    // Validación de campos
    if (!wellName) {
      setWellNameError(true);
      valid = false;
    } else {
      setWellNameError(false);
    }
    if (!lasFile) {
      setLasFileError(true);
      valid = false;
    } else {
      setLasFileError(false);
    }
    if (!valid) {
      setToastMessage("Please fill in all required fields.");
      setToastOpen(true);
      return;
    }

    setLoading(true);

    // Crear formData con los datos requeridos
    const formData = new FormData();
    formData.append("name", wellName); // Cambiar 'wellName' a 'name'
    formData.append("description", description);
    formData.append("file", lasFile); // Cambiar 'lasFile' a 'file'

    try {
      const response = await fetch("http://localhost:8080/wells/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // No es necesario establecer el Content-Type, ya que el navegador se encarga de eso con FormData
        },
        body: formData,
      });

      if (response.ok) {
        setToastMessage("Submission successful!");
        setToastOpen(true);
        navigate("/home");
      } else {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        setToastMessage(
          `Failed to submit well data: ${errorData.message || "Unknown error"}`
        );
        setToastOpen(true);
      }
    } catch (error) {
      setToastMessage("Error: " + error.message);
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Box display="flex" flexDirection="column" width="70%">
          <TextField
            label="Well Name"
            value={wellName}
            onChange={handleWellNameChange}
            margin="normal"
            fullWidth
            error={wellNameError}
            helperText={wellNameError ? "Well Name is required" : ""}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            fullWidth
          />
          <Box display="flex" alignItems="center" mt={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="well-image"
              type="file"
              onChange={handleImageChange}
            />
            <label
              htmlFor="well-image"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "5px",
                backgroundColor: hoverImage ? "lightblue" : "transparent",
              }}
              onMouseEnter={() => setHoverImage(true)}
              onMouseLeave={() => setHoverImage(false)}
            >
              <IconButton color="primary" component="span">
                <ImageIcon />
              </IconButton>
              <Typography variant="body1" component="span" ml={1}>
                Upload Image
              </Typography>
            </label>
            {imagePreview && (
              <Box display="flex" alignItems="center" ml={2}>
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <IconButton color="secondary" onClick={handleRemoveImage}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <input
              accept=".las"
              style={{ display: "none" }}
              id="well-las"
              type="file"
              onChange={handleLasFileChange}
            />
            <label
              htmlFor="well-las"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "5px",
                backgroundColor: hoverFile ? "lightblue" : "transparent",
              }}
              onMouseEnter={() => setHoverFile(true)}
              onMouseLeave={() => setHoverFile(false)}
            >
              <IconButton color="primary" component="span">
                <AttachFileIcon />
              </IconButton>
              <Typography variant="body1" component="span" ml={1}>
                Attach LAS File
              </Typography>
            </label>
            {lasFilePreview && (
              <Box display="flex" alignItems="center" ml={2}>
                <Typography
                  variant="body2"
                  component="span"
                  color={lasFileError ? "error" : "inherit"}
                >
                  {lasFilePreview}
                </Typography>
                <IconButton color="secondary" onClick={handleRemoveLasFile}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            {lasFileError && (
              <Typography variant="body2" color="error" ml={2}>
                LAS File is required
              </Typography>
            )}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ marginRight: "10px" }}
          >
            Submit
          </Button>
          {loading && <CircularProgress size={24} />}
        </Box>
      </Box>
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message={toastMessage}
      />
    </div>
  );
};
export default LoadWell;
