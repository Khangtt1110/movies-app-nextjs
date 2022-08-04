export const overText = (params: string, length: number) => {
    return params.length > length ? params.slice(0, length - 1) + "..." : params;
};

export const stringToDate = (params: string) => {
    const date = new Intl.DateTimeFormat("en-GB", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(new Date(params));
    return String(date);
};
