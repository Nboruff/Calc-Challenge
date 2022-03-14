import React, { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import StyleIcon from '@mui/icons-material/Style';
import { AppBar } from '@material-ui/core';
import {IconButton, List, Toolbar, SwipeableDrawer, ListItem, ListItemIcon, ListItemText} from '@mui/material'
function NavBar() {
  const [drawer_state, setDrawerState] = useState(false)
  const toggleDrawer = (state) => (ev) => {
    setDrawerState(state)
  }
    return(        
        <AppBar style={{ background: "#645390"}} position="static">
          <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon justify="left"/>
              </IconButton>
              <SwipeableDrawer 
                anchor="top" 
                open={drawer_state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                >
                <List sx={{ background: "#645390" }}>
                  <ListItem>
                      <ListItemIcon>
                        <IconButton>
                          <StyleIcon sx={{ color: "white"}}>Style Settings</StyleIcon>

                        </IconButton>
                      </ListItemIcon>
                <ListItemText primary="Style Settings" sx={{ color: "white" }} />
                    </ListItem>
                  </List>
                </SwipeableDrawer>
          </Toolbar>
        </AppBar>)
}

export default NavBar;