import { useEffect, useMemo, useState } from "react";
import { Genres, MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import getCategoryDetail from "../../pages/api/categoryApi";

import apiConfig from "../../pages/api/apiConfig";

import { useRouter } from "next/router";
import "swiper/css";
import { useAppDispatch } from "../../features/hooks";
import { setDetailState } from "../../features/movie/movieSlice";
import { Category, CategoryData } from "../../models";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import { Typography } from "@mui/material";
import styles from "./categoryList.module.scss";
import categoryApi from "../../pages/api/categoryApi";
import { overText, stringToDate } from "../../common/overText";

type Props = {
    cate: string;
    type: string;
};

const CategoryList = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [categoryData, setCategoryData] = useState<CategoryData[]>();
    const [genres, setGenres] = useState<Genres>();
    const path = props.cate === Category.movie ? MOVIES_PATH : TV_SHOW_PATH;

    const wiperSlice = {
        width: 110,
        height: 150,
    };
    // get image path from api result
    const imagePath = useMemo(
        () => (poster: string, backdrop: string) => apiConfig.originalImage(poster) || backdrop,
        [],
    );

    /**
     * Get movies data
     */
    useEffect(() => {
        try {
            const params = {};
            const getList = async () => {
                const response = await getCategoryDetail.getCategory(props.cate, props.type, {
                    params,
                });
                setCategoryData(response.results.slice(0, 4));
            };

            const getGenres = async () => {
                const response = await categoryApi.getGenres(props.cate);
                setGenres(response);
            };
            getGenres();
            getList();
        } catch (error) {
            console.log("Fetch API category slice fail: ", error);
        }
    }, [props]);

    /**`
     * handle redirect to category detail
     * @param item
     */
    const handleSlideClick = (item: CategoryData) => {
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
    };

    const getGenreById = (id: number) => {
        return genres?.genres.find((x) => x.id === id)?.name + " ";
    };

    return (
        <Typography className={`row g-4 ${styles.container}`}>
            {categoryData &&
                categoryData.map((item) => (
                    <Typography key={item.id} className={`col-md-6 col-lg-3 `}>
                        <Typography
                            style={{
                                background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 100%), url(${imagePath(
                                    item.poster_path,
                                    item.backdrop_path,
                                )}`,
                            }}
                            className={`px-4 ${styles.background}`}
                        >
                            <Typography className={`${styles.genres} text-uppercase d-flex`}>
                                {item.genre_ids.map((id, index) =>
                                    index < 2 ? (
                                        <Typography key={id} className="fs-6">
                                            {getGenreById(id)}
                                        </Typography>
                                    ) : null,
                                )}
                            </Typography>

                            <Typography className={`fs-1 overflow-hidden ${styles.name}`}>
                                {item.name || item.title}
                            </Typography>

                            <Typography className={`pb-4 d-flex align-items-center`}>
                                <PlayCircleIcon
                                    className={styles.icon}
                                    onClick={() => {
                                        handleSlideClick(item);
                                    }}
                                />
                                <Typography className="fs-5">
                                    {stringToDate(item.first_air_date)}
                                </Typography>
                            </Typography>
                        </Typography>
                    </Typography>
                ))}
        </Typography>
    );
};

export default CategoryList;
