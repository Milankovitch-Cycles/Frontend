import React, { useState } from 'react';
import { Navbar } from '../../components';
import { Button, TextField, IconButton, Box, Typography, Snackbar, CircularProgress } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createWell } from '../../api/authService';

const LoadWell = () => {
    const [wellName, setWellName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [lasFile, setLasFile] = useState(null);
    const [lasFilePreview, setLasFilePreview] = useState(null);
    const [hoverImage, setHoverImage] = useState(false);
    const [hoverFile, setHoverFile] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
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
            setToastMessage('Por favor complete todos los campos requeridos.');
            setToastOpen(true);
            return;
        }
    
        setLoading(true);
    
        const formData = {
            name: wellName,
            description: description,
            filename: lasFile.name, 
        };
    
        const token = dataAuthentication.access_token;
    
        try {
            const response = await createWell(formData, token);

            setToastMessage('¡Pozo cargado exitosamente!');
            setToastOpen(true);
            navigate('/home');
        } catch (error) {
            setToastMessage('Error al cargar el pozo: ' + error.message);
            setToastOpen(true);
        } finally {
            setLoading(false);
        }
    };
    
    const handleCloseToast = () => {
        setToastOpen(false);
    };
    
    return (
        <>
        <Navbar />
        <div className="bg-gradient-to-r from-gray-700 to-black min-h-screen flex items-center justify-center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={4}
              sx={{
                width: '100%',
                maxWidth: '600px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
                <Typography variant="h4" className="text-center mb-4" color="white">Cargar Pozo</Typography>
                <TextField
                    label="Nombre del Pozo"
                    value={wellName}
                    onChange={handleWellNameChange}
                    margin="normal"
                    fullWidth
                    error={wellNameError}
                    helperText={wellNameError ? 'El nombre del pozo es obligatorio' : ''}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px',
                    }}
                />
                <TextField
                    label="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '8px',
                    }}
                />
                <Box display="flex" alignItems="center" mt={2}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="well-image"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label
                        htmlFor="well-image"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '5px',
                            backgroundColor: hoverImage ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                            color: 'white'
                        }}
                        onMouseEnter={() => setHoverImage(true)}
                        onMouseLeave={() => setHoverImage(false)}
                    >
                        <IconButton color="primary" component="span">
                            <ImageIcon />
                        </IconButton>
                        <Typography variant="body1" component="span" ml={1} color="white">
                            Subir Imagen
                        </Typography>
                    </label>
                    {imagePreview && (
                        <Box display="flex" alignItems="center" ml={2}>
                            <img src={imagePreview} alt="Image Preview" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                            <IconButton color="secondary" onClick={handleRemoveImage}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                    <input
                        accept=".las"
                        style={{ display: 'none' }}
                        id="well-las"
                        type="file"
                        onChange={handleLasFileChange}
                    />
                    <label
                        htmlFor="well-las"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '5px',
                            backgroundColor: hoverFile ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                            color: 'white'
                        }}
                        onMouseEnter={() => setHoverFile(true)}
                        onMouseLeave={() => setHoverFile(false)}
                    >
                        <IconButton color="primary" component="span">
                            <AttachFileIcon />
                        </IconButton>
                        <Typography variant="body1" component="span" ml={1} color="white">
                            Adjuntar Archivo LAS
                        </Typography>
                    </label>
                    {lasFilePreview && (
                        <Box display="flex" alignItems="center" ml={2}>
                            <Typography variant="body2" component="span" color={lasFileError ? 'error' : 'white'}>
                                {lasFilePreview}
                            </Typography>
                            <IconButton color="secondary" onClick={handleRemoveLasFile}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    )}
                    {lasFileError && (
                        <Typography variant="body2" color="error" ml={2}>
                            El archivo LAS es obligatorio
                        </Typography>
                    )}
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{ marginRight: '10px' }}
                    >
                        Enviar
                    </Button>
                    {loading && <CircularProgress size={24} color="secondary" />}
                </Box>
            </Box>
        </div>
        <Snackbar
            open={toastOpen}
            autoHideDuration={6000}
            onClose={handleCloseToast}
            message={toastMessage}
        />
        </>
    );
};

export default LoadWell;
