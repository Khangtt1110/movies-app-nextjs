import { useEffect, useMemo, useState } from "react";
import { Autoplay, Lazy, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import getCategoryDetail from "../../pages/api/categoryApi";

import { overText, stringToDate } from "../../common/overText";
import apiConfig from "../../pages/api/apiConfig";

import Image from "next/image";
import { useRouter } from "next/router";
import "swiper/css";
import { useAppDispatch } from "../../features/hooks";
import { setDetailState } from "../../features/movie/movieSlice";
import { Category, CategoryData } from "../../models";

import styles from "./categoryList.module.scss";
import { Typography } from "@mui/material";

type Props = {
    cate: string;
    type: string;
};

const CategoryList = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [categoryData, setCategoryData] = useState<CategoryData[]>();
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
                setCategoryData(response.results);
            };
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

    return (
        <Typography className={`row ${styles.container}`}>
            {categoryData &&
                categoryData.map((item) => (
                    <Typography
                        key={item.id}
                        style={{ backgroundImage: imagePath(item.poster_path, item.backdrop_path) }}
                        className={`col-md-6 col-lg-3 ${styles.background}`}
                    >
                        <Typography>{item.name || item.title}</Typography>
                    </Typography>
                ))}
        </Typography>
    );
};

export default CategoryList;
