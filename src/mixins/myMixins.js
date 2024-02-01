export const myMixins = {
    data() {
        return {
          covoiturageSelectionne: null,
        };
    },
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
        generateRandomEmail() {
            const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let email = '';
            for (let i = 0; i < 8; i++) {
                email += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return email + '@example.com';
        },
        generateRandomPhoneNumber() {
            const characters = '0123456789';
            let phoneNumber = '+';
            for (let i = 0; i < 12; i++) {
                phoneNumber += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return phoneNumber;
        },
        convertirTypeLieu(typeLieu) {
            switch (typeLieu) {
                case 'AIRE_DE_COVOITURAGE':
                    return 'Aire de covoiturage';
                case 'PARKING':
                    return 'Parking';
                case 'AUTO_STOP':
                    return 'Auto-stop';
                case "SORTIE_D'AUTOROUTE":
                    return "Sortie d'autoroute";
                case "SUPERMARCHE":
                    return "Supermarché"
                default:
                    return typeLieu;
            }
        },
        formatCurrentDateTime() {
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
            const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
            return `${formattedDate} ${formattedTime}`;
        },
    }
}



