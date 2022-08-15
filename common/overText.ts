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
    if (props <= 60) {
        return (data = String(props) + "m");
    }
    data = String(Math.floor(props / 60)) + "h " + String(props % 60) + "m";
    return data;
};

//format total rate on the 5 scale
export const totalRate = (rate: number) => ((rate * 5) / 10).toFixed(2);

/**
 * function get last word of array string
 */

export const getLastName = (name: string) => {
    const string = name.split(" ");
    const length = string.length;
    return string[length - 1];
};

export const getAnotherName = (name: string) => {
    const string = name.split(" ");
    const length = string.length;
    return string.slice(0, length - 1).join(" ");
};
