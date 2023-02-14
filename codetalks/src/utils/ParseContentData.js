export default function (data) {
    // Object.keys(data) // verilen objelerin key lerini array yapısında return eder.
    return Object.keys(data).map(key => {
        return {
            id: key,
            ...data[key],
        }
    }).sort(function (a, b) {
        return (a.date > b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
    });
}