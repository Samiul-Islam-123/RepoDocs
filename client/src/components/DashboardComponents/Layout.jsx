import React, { useState } from "react"
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material"
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  MoreVert,
} from "@mui/icons-material"
import { useThemeContext } from "../../context/ThemeContext"
import { RiAiGenerate2 } from "react-icons/ri"
import { SlEnergy } from "react-icons/sl"
import { FaHistory } from "react-icons/fa"
import { IoMdHome } from "react-icons/io"
import { IoIosSettings } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const drawerWidth = 240
const collapsedDrawerWidth = 64

const Layout = ({ children }) => {
  const { mode, toggleTheme } = useThemeContext()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMobileMoreAnchorEl(null)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <SlEnergy />
        </IconButton>
        <p>16 Bolts Left</p>
      </MenuItem>
      <MenuItem>
        <Button
          variant="contained"
          size="small"
          startIcon={<SlEnergy />}
          sx={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            fontWeight: 600,
            "&:hover": {
              background: "rgba(255,255,255,0.3)",
            },
            borderRadius: "20px",
            px: 2,
          }}
        >
          Buy Bolts
        </Button>
      </MenuItem>
      <MenuItem onClick={toggleTheme}>
        <IconButton size="large" color="inherit">
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <p>Toggle Theme</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          mode === "light"
            ? "linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)"
            : "linear-gradient(180deg, #1A1C2A 0%, #2C2E3E 100%)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton
          style={{
            color: mode === "light" ? "#000" : "#fff",
          }}
          onClick={handleDrawerToggle}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <List sx={{ flexGrow: 1, px: 2 }}>
        {[
          { text: "Home", icon: <IoMdHome /> },
          { text: "Generate", icon: <RiAiGenerate2 /> },
          { text: "History", icon: <FaHistory /> },
          { text: "Settings", icon: <IoIosSettings /> },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{
              borderRadius: "8px",
              mb: 1,
              color: mode === "dark" ? "white" : "black",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.08)",
                transform: "translateX(5px)",
              },
            }}
            onClick={() => {
              navigate(`/dashboard/${item.text.toLowerCase()}`)
              if (isMobile) {
                handleDrawerToggle()
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: open ? 40 : "auto",
                color: theme.palette.primary.main,
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && (
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                  },
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)` },
          ml: { sm: `${open ? drawerWidth : collapsedDrawerWidth}px` },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          background:
            mode === "light"
              ? "linear-gradient(90deg, #6366F1 0%, #EC4899 100%)"
              : "linear-gradient(90deg, #4F46E5 0%, #BE185D 100%)",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              ml: "10px",
              cursor : "pointer",
              fontWeight: 700,
              background: "linear-gradient(to right, #FFFFFF, rgba(255,255,255,0.9))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => {
                navigate('/')
            }}
          >
            {import.meta.env.VITE_APP_NAME}
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <SlEnergy style={{ color: "#FFD700", marginRight: "4px" }} />
              <Typography variant="body1" sx={{ color: "white", fontWeight: 600 }}>
                16 Bolts Left
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="medium"
              startIcon={<SlEnergy />}
              sx={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
                borderRadius: "20px",
                px: 2,
              }}
            >
              Buy Bolts
            </Button>

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{
                background: "rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              }}
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>

            <IconButton
              size="medium"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                background: "rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: open ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedDrawerWidth,
            boxSizing: "border-box",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            borderRight: "none",
            boxShadow:
              mode === "light"
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18)",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ml: 0,
          mt: { xs: "56px", sm: "64px" }, // Adjust top margin for AppBar height
          background: mode === "light" ? "#F7FAFC" : "#1A202C",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout

