export const myMixins = {
    methods: {
        getFormattedDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = this.getMonthName(date.getMonth());
            return `${day} ${month}`;
        },
        getMonthName(monthIndex) {
            const months = [
                'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun',
                'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            return months[monthIndex];
        },
    }
};
