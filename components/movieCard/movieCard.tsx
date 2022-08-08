import { useMemo } from "react";
import { overText } from "../../common/overText";
import { CategoryData } from "../../models";
import apiConfig from "../../pages/api/apiConfig";

import styles from "./movieCard.module.scss";

type Props = {
    key: number;
    item: CategoryData;
};

const MovieCard = (props: Props) => {
    const background = useMemo(() => {
        return apiConfig.originalImage(props.item.poster_path || props.item.backdrop_path);
    }, [props.item]);
    return (
        <div className={styles.container}>
            <div className={styles.image} style={{ backgroundImage: `url(${background})` }}></div>
            <div className={styles.title}>{overText(props.item.title || props.item.name, 20)}</div>
        </div>
    );
};

export default MovieCard;
