import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Video } from "../../models";
import moviesApi from "../../pages/api/moviesApi";

import styles from "./trailerVideo.module.scss";

const TrailerVideo = () => {
    const router = useRouter();
    const [videoData, setVideoData] = useState<Video[]>([]);
    const category = String(router.query.category);
    const id = Number(router.query.id);

    useEffect(() => {
        try {
            // fetch api
            const getVideo = async () => {
                const response = await moviesApi.getTrailerVideo(category, id);
                // get 4 video from api
                setVideoData(response.results.slice(0, 4));
            };
            getVideo();
        } catch (error) {
            console.log("Fetch Video API fail");
        }
    }, [category, id]);

    return (
        <div className={styles.container}>
            {videoData && videoData.length > 0 && (
                <>
                    <div className={styles.title}>Trailer</div>
                    {videoData.map((item) => (
                        <div key={item.id} className={styles.video}>
                            <h1 className={styles.name}>{item.name}</h1>
                            <iframe src={`https://www.youtube.com/embed/${item?.key}`} />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default TrailerVideo;
