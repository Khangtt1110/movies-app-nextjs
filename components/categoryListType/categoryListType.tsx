import { Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { stringToDate } from "../../common/overText";
import { useAppDispatch } from "../../features/hooks";
import { setDetailState } from "../../features/movie/movieSlice";
import { Category, CategoryData, Genres, MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import apiConfig from "../../pages/api/apiConfig";
import categoryApi from "../../pages/api/categoryApi";

import styles from "./categoryListType.module.scss";

interface Props {
    cate: string;
    type: string;
    textColor: string;
}

const CategoryListType = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const path = props.cate === Category.movie ? MOVIES_PATH : TV_SHOW_PATH;
    const [categoryData, setCategoryData] = useState<CategoryData[]>();
    const [genres, setGenres] = useState<Genres>();
    const imagePath = useMemo(
        () => (poster: string, backdrop: string) => apiConfig.originalImage(poster) || backdrop,
        [],
    );
    useEffect(() => {
        try {
            const param = { params: {} };
            const getCategoryList = async () => {
                const response = await categoryApi.getCategory(props.cate, props.type, param);
                setCategoryData(response.results.slice(0, 12));
            };
            const getGenres = async () => {
                const response = await categoryApi.getGenres(props.cate);
                setGenres(response);
            };
            getGenres();
            getCategoryList();
        } catch (error) {
            console.log(error);
        }
    }, [props.cate, props.type]);

    const getGenreById = useCallback(
        (id: number) => {
            return genres?.genres.find((x) => x.id === id)?.name + " ";
        },
        [genres?.genres],
    );

    const handleSlideClick = useCallback(
        (item: CategoryData) => {
            const movieType = {
                category: props.cate,
                id: item.id,
            };
            // add to redux store
            dispatch(setDetailState(movieType));

            // get path
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
        [dispatch, path, props.cate, router],
    );

    return useMemo(
        () => (
            <div className="container">
                <Typography className="row g-5">
                    {categoryData &&
                        categoryData.map((item) => (
                            <Typography
                                key={item.id}
                                className={`col-6 col-sm-4 col-md-3 col-lg-2 mb-4 ${
                                    props.textColor === "white" ? "text-light" : "text-back"
                                }`}
                            >
                                <Image
                                    src={imagePath(item.poster_path, item.backdrop_path)}
                                    alt=""
                                    width={200}
                                    height={300}
                                />
                                <Typography
                                    className={`d-flex justify-content-between mb-1 ${
                                        props.textColor === "white"
                                            ? "text-white-50"
                                            : "text-back-50"
                                    }`}
                                >
                                    <Typography className="font-mont">
                                        {stringToDate(item.release_date || item.first_air_date)}
                                    </Typography>

                                    {item.genre_ids.map((id, index) =>
                                        index < 1 ? (
                                            <Typography key={id} className="font-mont text-danger">
                                                {getGenreById(id)}
                                            </Typography>
                                        ) : null,
                                    )}
                                </Typography>

                                <Typography
                                    className={`fs-4 overflow-hidden ${styles.name}`}
                                    onClick={() => {
                                        handleSlideClick(item);
                                    }}
                                >
                                    {item.name || item.title}
                                </Typography>
                            </Typography>
                        ))}
                </Typography>
            </div>
        ),
        [categoryData, getGenreById, handleSlideClick, imagePath, props.textColor],
    );
};

export default CategoryListType;
