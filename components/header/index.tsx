import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";
import { useCallback, useState } from "react";
import { PROFILE_PATH } from "../../models";

import { useAppSelector } from "../../features/hooks";
import { selectCategory } from "../../features/movie/movieSlice";
import styles from "./header.module.scss";

export default function Header() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [menuPopup, setMenuPopup] = useState(false);
    const navItems = ["Home", "About", "Contact"];
    const [searchValue, setSearchValue] = useState("");
    const category = useAppSelector(selectCategory);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMenuClick = () => {
        setMenuPopup(!menuPopup);
    };

    const navbarWidth = 200;

    const navbar = (
        <Box onClick={handleMenuClick} className={styles.navbar}>
            <Typography variant="h6" className={styles.title}>
                Movies App
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton className={styles.item}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        router.push(`${PROFILE_PATH}${Math.random().toString}`);
    };

    // set key value
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
    };

    const handleSearch = useCallback(
        (event: React.FormEvent<HTMLElement>) => {
            if (searchValue.length > 0) {
                router.push(`${category}/search/` + searchValue);
            }
        },
        [category, router, searchValue],
    );

    const menuId = "primary-search-account-menu";

    const mobileMenuId = "primary-search-account-menu-mobile";

    return (
        <div className={styles.container}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    sx={{ background: "#ff5b64", borderRadius: "0 0 5px 5px" }}
                >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={handleMenuClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            MUI
                        </Typography>
                        <form className={styles["search-wrapper"]} onSubmit={handleSearch}>
                            <div className={styles["search-input"]}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                                className={styles["search-placeholder"]}
                                onChange={handleChangeValue}
                            />
                        </form>
                        <Box sx={{ flexGrow: 1 }} />
                        {/* navbar */}
                        <Box component="nav">
                            <Drawer
                                variant="temporary"
                                open={menuPopup}
                                onClose={handleMenuClick}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{
                                    display: { xs: "block", sm: "none" },
                                    "& .MuiDrawer-paper": {
                                        boxSizing: "border-box",
                                        width: navbarWidth,
                                    },
                                }}
                            >
                                {navbar}
                            </Drawer>
                        </Box>
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
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
                                onClick={handleProfileClick}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
