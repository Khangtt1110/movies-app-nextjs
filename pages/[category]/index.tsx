import { Button, CircularProgress, InputBase } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import MovieCard from "../../components/movieCard";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { selectCategory, selectLoading, setLoading } from "../../features/movie/movieSlice";
import {
    Category,
    CategoryData,
    ListResponse,
    Movies,
    MovieType,
    TvShows,
    TvShowType,
} from "../../models";
import moviesApi from "../api/moviesApi";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./category.module.scss";
import { useSelector } from "react-redux";

const CategoryList = () => {
    let category = useAppSelector(selectCategory);
    const isLoading = useSelector<boolean>(selectLoading);
    const dispatch = useAppDispatch();
    const [listCategory, setListCategory] = useState<CategoryData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const router = useRouter();
    const location = router.asPath.slice(1);
    const [isSearch, setIsSearch] = useState(false);
    // get type by category
    const type =
        router.asPath.slice(1) === Category.movie ? MovieType.popular : TvShowType.top_rated;

    if (category === "" || category === undefined) {
        category = router.pathname.slice(1);
    }

    // Reset;
    useEffect(() => {
        setTimeout(() => {
            setKeyword("");
        }, 500);
    }, [location]);

    let params = {};
    let response: ListResponse<Movies> | ListResponse<TvShows> | null = null;
    // fetch Search APi
    const searchApi = async () => {
        if (keyword !== "") {
            params = {
                query: keyword,
            };
            response = await moviesApi.search(location, { params });
        }
        setListCategory(response?.results as []);
        setTotalPage(response?.total_pages || 0);
    };
    useEffect(() => {
        const getData = async () => {
            if (keyword === "") {
                switch (location) {
                    case Category.movie:
                        response = await moviesApi.getMovieList(type);
                        break;
                    case Category.tv:
                        response = await moviesApi.getTvShowList(type);
                        break;
                }
            }
            setListCategory(response?.results as []);
            setTotalPage(response?.total_pages || 0);
        };
        // if search will call api
        isSearch && searchApi();
        dispatch(setLoading(true));
        getData();
        console.log(isSearch);
        return () => {
            // clear search
            setIsSearch(false);
        };
    }, [dispatch, keyword, location, type]);

    // Load more page from api
    const loadMore = async () => {
        let response = null;
        // next page
        const params = {
            page: page + 1,
        };
        response = await moviesApi.getTvShowList2(category, type, { params });
        // add new data
        setListCategory([...listCategory, ...(response.results as [])]);
        // set new page
        setPage(page + 1);
    };

    // get search value
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
    };

    // handle to resolve logic search
    const handleSearch = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        setKeyword(searchValue);
        setIsSearch(true);
        setSearchValue("");
    };
    return (
        <>
            {isLoading ? (
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        {router.asPath.slice(1) === Category.movie ? "Movies" : "Tv Shows"}
                    </h1>
                    <form className={styles["search-wrapper"]} onSubmit={handleSearch}>
                        <div className={styles["search-input"]}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            className={styles["search-placeholder"]}
                            onChange={handleChangeValue}
                            value={searchValue}
                        />
                    </form>
                    <div className={styles.wrapper}>
                        {listCategory?.length > 0 ? (
                            listCategory?.map((item) => <MovieCard key={item.id} item={item} />)
                        ) : (
                            <div>No recent items match your search</div>
                        )}
                    </div>
                    {page < totalPage ? (
                        <div>
                            <Button onClick={loadMore} style={{ marginBottom: "5rem" }}>
                                Load more
                            </Button>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="loading">
                    <CircularProgress />
                </div>
            )}
        </>
    );
};

export default CategoryList;
