const util = {
    normalizeNumber(number: number) {
        if (number > 100000) {
            return (number / 1000).toFixed(0) + 'K';
        } else if (number > 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return '' + number;
    },

    currentUtc() {
        return new Date().getTime();
    }
}

export default util;
