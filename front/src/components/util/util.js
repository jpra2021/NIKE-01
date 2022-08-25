export const overlapCheck = (state, title) => {
    const filtered = state.filter((project) => project.title === title);

    if (filtered.length === 1) {
        return true;
    }

    return false;
}

export const formatDateStr = (date) => {
    const year = date.getFullYear();
    const month =('0' + (date.getMonth() + 1));
    let day = date.getDate();

    if (day <= 9) {
        day = "0" + day;
    }

    const period = year + '-' + month + '-' + day;

    return period;
}