import { Button } from "@mui/material";
import { style } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard";
import { useAppSelector } from "../../features/hooks";
import { selectCategory } from "../../features/movie/movieSlice";
import { Category, ListResponse, Movies, MovieType, TvShows, TvType } from "../../models";
import moviesApi from "../api/moviesApi";

import styles from "./category.module.scss";

const CategoryList = () => {
    let category = useAppSelector(selectCategory);
    const [listCategory, setListCategory] = useState<any>();
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const router = useRouter();

    if (category === "" || category === undefined) {
        category = router.pathname.slice(1);
    }
    useEffect(() => {
        let params = {};
        const getList = async () => {
            let response = null;
            switch (category) {
                // case Category.movie:
                //     response = await moviesApi.getMovieList(MovieType.upcoming);
                //     break;
                case Category.tv:
                    response = await moviesApi.getTvShowList(TvType.top_rated);
                    break;
            }
            setListCategory(response?.results);
            setTotalPage(response?.total_pages || 0);
        };
        getList();
    }, [category]);

    const loadMore = async () => {
        let response = null;
        const params = {
            page: page + 1,
        };
        response = await moviesApi.getTvShowList2(TvType.top_rated, { params });
        setListCategory([...listCategory, ...response.results]);
        setPage(page + 1);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{category === Category.movie ? "Movies" : "Tv Shows"}</h1>
            <div className={styles.wrapper}>
                {listCategory?.map((item: any) => (
                    <MovieCard key={item.id} item={item} />
                ))}
            </div>
            {page < totalPage ? (
                <div>
                    <Button onClick={loadMore} style={{ marginBottom: "5rem" }}>
                        Load more
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default CategoryList;
