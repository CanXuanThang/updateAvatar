import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import logo from '../../../../imagies/Rectangle4.png';
import logoUsa from '../../../../imagies/usa.png';

import './Home.scss';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setLocale } from '../../../intl/redux/intlReducer';
import { FormattedMessage } from 'react-intl';

import icon6 from './icons/icon5.png';
import { icons } from './icons/Icons';
import Info from '../employeeManagement/layouts/info/Info';
import { setTitle } from '../../redux/employeeReducer';
import { ROUTES } from '../../../../configs/routes';
import { Link } from 'react-router-dom';

const drawerWidth = 328;

interface Props {
  window?: () => Window;
  children: any;
}

export default function Home(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [tran, setTran] = React.useState<string>('en');
  const [open, setOpen] = React.useState<boolean>(false);
  const [path, setPath] = React.useState<string>('Employee Management');

  const handleChange = (event: SelectChangeEvent) => {
    setTran(event.target.value);
  };

  const handleOpenInfo = () => {
    setOpen(!open);
  };

  const handleCloseInfo = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const addTitle = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedTitle = e.currentTarget.getAttribute('value');
    selectedTitle && setPath(selectedTitle);
  };

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  React.useEffect(() => {
    dispatch(setLocale(tran));
    dispatch(setTitle(path));
  }, [tran, dispatch, path]);

  const drawer = (
    <div style={{ padding: 24, marginTop: 70 }}>
      <h4 className="content-menu-title">
        <FormattedMessage id="menu-title" />
      </h4>
      <List>
        {icons.map((text, index) => (
          <Link
            key={index}
            to={text.path === 'employee' ? ROUTES.employee : '/home'}
            style={{ textDecoration: 'none', color: '#11181C' }}
          >
            <ListItem disablePadding onClick={addTitle} value={text.title}>
              <ListItemButton
                sx={{
                  padding: '8px 10px',
                  marginTop: '10px',
                  borderRadius: '10px',
                  '&:focus': { backgroundColor: 'rgb(241, 243, 245)' },
                }}
                autoFocus={text.title === 'Employee Management'}
              >
                <ListItemIcon sx={{ minWidth: '46px' }}>
                  <img src={text.icon} alt="" />
                </ListItemIcon>
                <ListItemText primary={text.title} sx={{ span: { fontFamily: 'SVN-Sofia-Regular' } }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={{ margin: '10px 0' }} />
      <h4 className="advance-title">
        <FormattedMessage id="advance" />
      </h4>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={icon6} alt="" />
            </ListItemIcon>
            <ListItemText primary={'Global Setting'} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', background: '#f8f9fa' }} onClick={handleCloseInfo}>
      <AppBar className="header">
        <Toolbar>
          <img src={logo} alt="" className="img" />
          <Typography variant="h6" noWrap component="div" sx={{ color: '#000' }} className="header-title">
            <label htmlFor="inputEmail" className="form-label" style={{ marginBottom: 0 }}>
              <FormattedMessage id="title" />
            </label>
          </Typography>
        </Toolbar>
        <Toolbar>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <div className="container-select">
                <Select
                  defaultValue=""
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                  style={{ background: '#f1f3f5' }}
                  displayEmpty
                  className="ip"
                >
                  <MenuItem value="" id="menu-item-1" disabled>
                    <Button variant="text" className="btn-tran">
                      <div className="container-tran">
                        <img src={logoUsa} alt="USA" className="container-tran-img" />
                        <span className="item-tran-span">EN</span>
                      </div>
                    </Button>
                  </MenuItem>
                  <MenuItem value="en" className="item-tran">
                    <Button variant="text" className="btn-container">
                      <div className="container-item-tran">
                        <img src={logoUsa} alt="USA" className="container-tran-img" />
                        <span className="item-tran-span">EN</span>
                      </div>
                    </Button>
                  </MenuItem>
                  <MenuItem value="vi" className="item-tran">
                    <Button variant="text" className="btn-container">
                      <div className="container-item-tran">
                        <img src={logoUsa} alt="USA" className="container-tran-img" />
                        <span className="item-tran-span">VI</span>
                      </div>
                    </Button>
                  </MenuItem>
                </Select>
              </div>
            </FormControl>
          </Box>
          <button
            style={{ boxShadow: 'none' }}
            className="btn btn-info"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenInfo();
            }}
          >
            <span>t</span>
          </button>
          {open && (
            <div onClick={(e) => e.stopPropagation()}>
              <Info />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ zIndex: 1, width: 'calc(100% - 328px)' }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, background: '#f8f9fa', minWidth: 328 }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            background: '#FBFCFD',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            padding: '30px 46px 0px',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
