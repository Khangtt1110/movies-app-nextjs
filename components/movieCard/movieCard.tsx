import Image from "next/image";
import React, { useMemo } from "react";
import { Movies, TvShows } from "../../models";
import apiConfig from "../../pages/api/apiConfig";

import styles from "./movieCard.module.scss";

type Props = {
    key: number;
    item: Movies | TvShows;
};

const MovieCard = (props: Props) => {
    const background = useMemo(() => {
        return apiConfig.originalImage(props.item.poster_path || props.item.backdrop_path);
    }, [props.item]);
    return (
        <div className={styles.container}>
            <div className={styles.image} style={{ backgroundImage: `url(${background})` }}></div>
            <div className={styles.title}>{props.item.id}</div>
        </div>
    );
};

export default MovieCard;
