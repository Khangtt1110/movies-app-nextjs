import { useCallback, useEffect, useMemo, useState } from "react";
import ActorCard from "../../components/actorCard";
import { PopularActor } from "../../models";
import actorApi from "../api/actorApi";
import styles from "./actors.module.scss";

const Actors = () => {
    const [popularActor, setPopularActor] = useState<PopularActor[]>([]);
    const [page, setPage] = useState<number>(1);
    const [params, setParams] = useState<object>({ page: page });

    useEffect(() => {
        try {
            const getPopularActor = async () => {
                const response = await actorApi.getPopularActor(params);
                setPopularActor(response.results);
            };
            getPopularActor();
        } catch (error) {}
    }, [params]);

    // handle load more api
    const handleLoadMore = useCallback(async () => {
        const params = {
            page: page + 1,
        };
        const response = await actorApi.getPopularActor(params);
        setPopularActor([...popularActor, ...response.results]);
        setPage(page + 1);
    }, [page, popularActor]);

    // Function to return a new array without duplicate ids
    const uniqueIds: number[] = [];
    const listActor = popularActor.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.id);
        if (!isDuplicate) {
            uniqueIds.push(element.id);
            return true;
        }
        return false;
    });

    return useMemo(
        () => (
            <div className={styles.container}>
                {listActor && (
                    <>
                        {listActor.map((item) => (
                            <ActorCard key={item.id} id={item.id} />
                        ))}
                    </>
                )}
                <h3 onClick={handleLoadMore} style={{ marginBottom: "5rem" }}>
                    Load More
                </h3>
            </div>
        ),
        [handleLoadMore, listActor],
    );
};

export default Actors;
