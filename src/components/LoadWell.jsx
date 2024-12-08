import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const LoadWell = ({ closeModal }) => {
  const { t } = useTranslation(); // Hook para traducción
  const [wellName, setWellName] = useState("");
  const [description, setDescription] = useState("");
  const [lasFile, setLasFile] = useState(null);
  const [lasFilePreview, setLasFilePreview] = useState(null);
  const [hoverFile, setHoverFile] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [wellNameError, setWellNameError] = useState(false);
  const [lasFileError, setLasFileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dataAuthentication = useSelector((state) => state.authToken);

  const handleLasFileChange = (e) => {
    const file = e.target.files[0];
    setLasFile(file);
    setLasFilePreview(file.name);
    setLasFileError(false);
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
      setToastMessage(t("dialogs.loadWell.validationMessage")); // Traducción
      setToastOpen(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", wellName);
    formData.append("description", description);
    formData.append("file", lasFile);

    try {
      const response = await fetch("http://localhost:8080/wells/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        closeModal();
        Swal.fire({
          title: t("dialogs.loadWell.successTitle"), // Traducción
          icon: "success",
          confirmButtonText: t("dialogs.loadWell.successButton"), // Traducción
        }).then(() => {});
        setToastMessage(t("dialogs.loadWell.successMessage")); // Traducción
        setToastOpen(true);
      } else {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        setToastMessage(
          `${t("dialogs.loadWell.errorMessage")}: ${errorData.message || t("dialogs.loadWell.unknownError")}`
        ); // Traducción
        setToastOpen(true);
      }
    } catch (error) {
      setToastMessage(`${t("dialogs.loadWell.error")}: ${error.message}`); // Traducción
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
            label={t("dialogs.loadWell.wellNameLabel")} // Traducción
            value={wellName}
            onChange={handleWellNameChange}
            margin="normal"
            fullWidth
            error={wellNameError}
            helperText={wellNameError ? t("dialogs.loadWell.wellNameError") : ""}
          />
          <TextField
            label={t("dialogs.loadWell.descriptionLabel")} // Traducción
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            fullWidth
          />

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
                {t("dialogs.loadWell.attachFileLabel")} 
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
                {t("dialogs.loadWell.fileError")} 
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
            {t("dialogs.loadWell.addButton")}
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
