import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { overText, stringToDate } from "../../common/overText";
import { ActorDetail, ACTORS_PATH, PopularActor } from "../../models";
import actorApi from "../../pages/api/actorApi";
import apiConfig from "../../pages/api/apiConfig";

import styles from "./actorCard.module.scss";

type Props = {
    id: number;
};

const ActorCard = (props: Props) => {
    const [actorDetail, setActorDetail] = useState<ActorDetail>();
    const router = useRouter();
    // get img path
    const background = useCallback((path: string) => {
        return apiConfig.originalImage(path);
    }, []);

    const handleClickCard = useCallback(
        (id: number, name: string) => {
            // get path
            router.push(
                {
                    pathname: `${ACTORS_PATH}/${name} `,
                    query: {
                        id: id,
                    },
                },
                undefined,
                { shallow: true },
            );
        },
        [router],
    );

    useEffect(() => {
        try {
            const getActorDetail = async () => {
                const response = await actorApi.getActorDetail(props.id);
                setActorDetail(response);
            };
            getActorDetail();
        } catch (error) {}
    }, [props]);

    return useMemo(
        () => (
            <>
                {actorDetail && (
                    <div className={styles.container}>
                        <Image
                            src={background(actorDetail.profile_path || "")}
                            alt=""
                            width={100}
                            height={130}
                            onClick={() => {
                                handleClickCard(actorDetail.id, actorDetail.name);
                            }}
                        />
                        <div className={styles.wrapper}>
                            <div className={styles.name}>{actorDetail.name}</div>
                            <div className={styles.text}>
                                <div className={styles.date}>
                                    {stringToDate(actorDetail.birthday as string)}
                                </div>
                                <div>{actorDetail.place_of_birth}</div>
                            </div>
                            <div className={styles.biography}>
                                {overText(actorDetail.biography, 100)}
                            </div>
                        </div>
                    </div>
                )}
            </>
        ),
        [actorDetail, background, handleClickCard],
    );
};

export default ActorCard;
