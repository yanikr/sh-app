import { Box, Modal } from '@mui/material';
import { useState } from 'react';
import { CreateHeroForm } from './Form';

export const FormModal = ({ onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const handleFormSubmit = values => {};
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <CreateHeroForm onSubmit={handleFormSubmit} onClose={handleClose} />
      </Box>
    </Modal>
  );
};
