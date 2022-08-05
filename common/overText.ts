export const overText = (params: string, length: number) => {
    return params.length > length ? params.slice(0, length - 1) + "..." : params;
};

export const stringToDate = (params: string) => {
    if (params === undefined) {
        return null;
    }
    const date = new Intl.DateTimeFormat("en-GB", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(new Date(params));
    return String(date);
};

export const convertTime = (props: number) => {
    let data = "";
    if (props > 60) {
        data = String(Math.floor(props / 60)) + "h " + String(props % 60) + "m";
    }
    return data;
};
