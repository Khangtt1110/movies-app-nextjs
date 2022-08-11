import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { overText, totalRate } from "../../common/overText";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { selectCategory, setDetailState } from "../../features/movie/movieSlice";
import { Category, CategoryData, MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import apiConfig from "../../pages/api/apiConfig";

import styles from "./CategoryCard.module.scss";

type Props = {
    key: number;
    item: CategoryData;
};

const CategoryCard = (props: Props): JSX.Element => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const category = router.query.category;

    const background = useMemo(() => {
        return apiConfig.w500Image(props.item.poster_path || props.item.backdrop_path);
    }, [props.item]);

    // Set id into redux store and redirect
    // to movie detail by id and category

    const handleCardClick = useCallback(
        (item: CategoryData) => {
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
        },
        [category, dispatch, router],
    );

    return useMemo(
        () => (
            <div
                className={styles.container}
                onClick={() => {
                    handleCardClick(props.item);
                }}
            >
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${background})` }}
                ></div>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        {overText(props.item.title || props.item.name, 50)}
                    </div>
                    <div className={styles.overview}>{overText(props.item.overview, 100)}</div>
                    {Number(totalRate(props.item.vote_average)) > 0 && (
                        <div className={styles.rating}>
                            <Rating
                                precision={0.1}
                                readOnly
                                name="customized-color"
                                defaultValue={Number(totalRate(props.item.vote_average))}
                                max={5}
                            />
                            <div>{totalRate(props.item.vote_average)}</div>
                        </div>
                    )}
                </div>
            </div>
        ),
        [background, handleCardClick, props.item],
    );
};

export default CategoryCard;
