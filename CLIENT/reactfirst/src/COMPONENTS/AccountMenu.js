// AccountMenu.jsx

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import KeepMountedModal from './KeepMountedModal';
import Typography from '@mui/material/Typography';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setModalOpen(true);
  };

  const handlleClick = () => {
    
    setModalOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        
      >
        <MenuItem onClick={handlleClick} >
         
        <Avatar fontSize="small" /> 
        <Typography sx={{ p:1,fontSize:14,fontFamily: 'Poppins'}}>
           Profile
        </Typography>
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography sx={{ fontSize:14,fontFamily: 'Poppins'}}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
      
      {/* Pass open and onClose props to KeepMountedModal */}
      <KeepMountedModal open={modalOpen} onClose={handleModalClose} />
    </React.Fragment>
  );
}
