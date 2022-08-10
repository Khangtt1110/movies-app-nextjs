import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { overText } from "../../common/overText";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { selectCategory, setDetailState } from "../../features/movie/movieSlice";
import { Category, CategoryData, MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import apiConfig from "../../pages/api/apiConfig";

import styles from "./movieCard.module.scss";

type Props = {
    key: number;
    item: CategoryData;
};

const MovieCard = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const category = useAppSelector(selectCategory);

    const background = useMemo(() => {
        return apiConfig.w500Image(props.item.poster_path || props.item.backdrop_path);
    }, [props.item]);
    // Set id into redux store and redirect
    // to movie detail by id and category
    const handleCardClick = (item: CategoryData) => {
        const movieType = {
            category: category,
            id: item.id,
        };
        // add to redux store
        dispatch(setDetailState(movieType));

        // get path
        const path = category === Category.movie ? MOVIES_PATH : TV_SHOW_PATH;
        router.push(
            {
                pathname: `${path}/${item.name || item.title} `,
                query: {
                    id: item.id,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    return (
        <div
            className={styles.container}
            onClick={() => {
                handleCardClick(props.item);
            }}
        >
            <div className={styles.image} style={{ backgroundImage: `url(${background})` }}></div>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    {overText(props.item.title || props.item.name, 50)}
                </div>
                <div className={styles.overview}>{overText(props.item.overview, 100)}</div>
            </div>
        </div>
    );
};

export default MovieCard;
