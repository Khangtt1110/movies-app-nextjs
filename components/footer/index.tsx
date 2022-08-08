import * as React from "react";
import HdIcon from "@mui/icons-material/Hd";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
    BottomNavigation,
    BottomNavigationAction,
    createTheme,
    makeStyles,
    Theme,
} from "@mui/material";

import { useRouter } from "next/router";
import styles from "./footer.module.scss";
import { ACTORS_PATH, HOME_PATH, MOVIES_PATH, TV_SHOW_PATH } from "../../models/path";
import { useAppDispatch } from "../../features/hooks";
import { setCategory } from "../../features/movie/movieSlice";
import { Category } from "../../models";

import { useEffect, useState } from "react";

export interface Footer {
    title: string;
    value: string;
    category?: string;
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
        value: "movie",
        icon: HdIcon,
        category: Category.movie,
        path: MOVIES_PATH,
    },
    {
        title: "Tv Shows",
        value: "tv",
        icon: LiveTvIcon,
        category: Category.tv,
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
    const [value, setValue] = useState("home");

    const dispatch = useAppDispatch();
    /**
     * handle get click change status and redirect
     */

    useEffect(() => {
        setValue(router.asPath.slice(1));
    }, [router.asPath]);
    const handleClick = (item: Footer) => () => {
        setValue(item.value);
        dispatch(setCategory(item.category));
        router.push(item.path);
    };
    useEffect(() => {
        // if (value === "home") {
        //     router.push(HOME_PATH);
        // }
        // bug reload overload when pass  router into dependence
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

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
