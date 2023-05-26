import { Link } from 'react-router-dom';
import './Info.scss';

import { Avatar, Card, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { logout } from '../../../../redux/authReducer';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../../../../configs/routes';
import { useState } from 'react';

export default function Info() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLogOut = () => {
    dispatch(logout());
    dispatch(replace(ROUTES.login));
  };
  return (
    <Card className="card">
      <div className="avatar-name">
        <Stack direction="row" spacing={2}>
          <Avatar alt="t" src="/static/images/avatar/1.jpg" />
        </Stack>
        <span>thangcanxuan</span>
      </div>
      <div className="dev">
        <span>Developer</span>
        <span>Staff ID:</span>
      </div>
      <button className="btn btn-primary btn-logout" onClick={handleClickOpen}>
        Sign Out
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="notification-logout"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px 20px 4px 24px',
            justifyContent: 'space-between',
          }}
        >
          <DialogTitle id="alert-dialog-title">{'Do you wish to sign out?'}</DialogTitle>
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </div>
        <DialogActions>
          <div className="item-btn">
            <button className="btn btn-light btn-no" onClick={handleClose}>
              No
            </button>
            <button className="btn btn-primary btn-yes" onClick={onLogOut}>
              Yes
            </button>
          </div>
        </DialogActions>
      </Dialog>
      <Link to={''} className="reset-password">
        Reset Password
      </Link>
    </Card>
  );
}
