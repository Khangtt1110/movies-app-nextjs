import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { ActorDetail } from "../../../models";
import actorApi from "../../api/actorApi";

const ActorDetail = () => {
    const [actorDetail, setActorDetail] = useState<ActorDetail>();
    const router = useRouter();
    const actorId = Number(router.query.id);
    useEffect(() => {
        try {
            const getActorDetail = async () => {
                const response = await actorApi.getActorDetail(actorId);
                setActorDetail(response);
            };
            getActorDetail();
        } catch (error) {}
    }, [actorId]);
    return useMemo(
        () => (
            <>
                {actorDetail && (
                    <>
                        <div>{actorDetail.name}</div>
                    </>
                )}
            </>
        ),
        [actorDetail],
    );
};

export default ActorDetail;
