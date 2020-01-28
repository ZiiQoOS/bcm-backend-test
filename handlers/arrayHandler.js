const arrayHandler = {
    sortAndSlice(array, count) {
        array.sort((a, b) => {
            return a.price - b.price;
        });
        return array.slice(0, count);

    },
    addProviderProp(array, providerName) {
        array.forEach((f) => {
            f.provider = providerName;
        });
        return array;
    }
};
module.exports = arrayHandler;