import * as React from "react";
import HdIcon from "@mui/icons-material/Hd";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { useRouter } from "next/router";
import styles from "./footer.module.scss";
import { ACTORS_PATH, HOME_PATH, MOVIES_PATH, TV_SHOW_PATH } from "../models/path";

export interface Footer {
    title: string;
    value: string;
    icon: any;
    path: string;
}
// List options
const listFooter: Footer[] = [
    {
        title: "Home",
        value: "home",
        icon: HomeIcon,
        path: HOME_PATH,
    },
    {
        title: "Movies",
        value: "movies",
        icon: HdIcon,
        path: MOVIES_PATH,
    },
    {
        title: "Tv Shows",
        value: "tvShows",
        icon: LiveTvIcon,
        path: TV_SHOW_PATH,
    },
    {
        title: "Actors",
        value: "actors",
        icon: PeopleAltIcon,
        path: ACTORS_PATH,
    },
];

export default function Footer() {
    const router = useRouter();
    const [value, setValue] = React.useState("home");
    /**
     * handle get click change status and redirect
     */
    const handleClick = (item: Footer) => () => {
        setValue(item.value);
        router.push(item.path);
    };

    return (
        <BottomNavigation value={value} className={styles.container}>
            {listFooter.map((item) => (
                <BottomNavigationAction
                    className={styles.content}
                    onClick={handleClick(item)}
                    key={item.title}
                    label={item.title}
                    value={item.value}
                    icon={<item.icon />}
                />
            ))}
        </BottomNavigation>
    );
}
