import SearchIcon from "@mui/icons-material/Search";
import { Button, InputBase } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryCard from "../../components/categoryCard";
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

import styles from "./category.module.scss";

const CategoryList = () => {
    const [listCategory, setListCategory] = useState<CategoryData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [isSearch, setIsSearch] = useState(false);
    const [totalResult, setTotalResult] = useState<number>(0);
    const router = useRouter();
    const location = String(router.query.category);

    // get type by category
    const type = location === Category.movie ? MovieType.popular : TvShowType.top_rated;

    // Reset;
    useEffect(() => {
        setKeyword("");
        setSearchValue("");
        setPage(1);
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
        setTotalResult(response?.total_results as number);
        setTotalPage(response?.total_pages || 0);
    };

    useEffect(() => {
        const getData = async () => {
            if (keyword === "") {
                switch (location) {
                    case Category.movie:
                        response = await moviesApi.getCategory(location, type, { params });
                        break;
                    case Category.tv:
                        response = await moviesApi.getCategory(location, type, { params });
                        break;
                }
            }
            setListCategory(response?.results as []);
            setTotalPage(response?.total_pages || 0);
        };
        // if search will call api
        isSearch && searchApi();
        getData();
        return () => {
            // clear search
            setIsSearch(false);
        };
    }, [keyword, location, type]);

    // Load more page from api
    const loadMore = async () => {
        let response = null;
        // next page
        const params = {
            page: page + 1,
        };
        response = await moviesApi.getCategory(location, type, { params });
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
    };
    return (
        <>
            {listCategory && (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            {router.asPath.slice(1) === Category.movie ? "Movies" : "Tv Shows"}
                        </div>
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
                    </div>
                    <div className={styles.wrapper}>
                        {listCategory?.map((item) => (
                            <CategoryCard key={item.id} item={item} />
                        ))}
                    </div>
                    {page < totalPage ? (
                        <div>
                            <Button onClick={loadMore} style={{ marginBottom: "5rem" }}>
                                Load more
                            </Button>
                        </div>
                    ) : (
                        <div className={styles["total-result"]}>
                            {totalResult > 0
                                ? `${totalResult} Result`
                                : " No recent items match your search"}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default CategoryList;
