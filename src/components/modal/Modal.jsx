import { Box, Modal } from '@mui/material';

import { CreateHeroForm } from './Form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../state/state';

export const FormModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector(state => state.heroes.modalOpen);
  const handleClose = () => {
    onClose();
    dispatch(closeModal());
  };
  const handleFormSubmit = values => {};
  return (
    <Modal
      open={modalOpen}
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
          border: '2px black solid',
          borderRadius: '4px',
          backgroundColor: '#f2dcb1',
          p: 4,
        }}
      >
        <CreateHeroForm onSubmit={handleFormSubmit} onClose={handleClose} />
      </Box>
    </Modal>
  );
};
