const services = (axiosInstance) => ({
    getTest: function getTest() {
        console.log('getTest called');
        const min = 0
        const max = 1;
        const random = (Math.floor(Math.random() * (max - min + 1)) + min);
        const url = random ? 'https://httpbin.org/post' : 'https://httpbin.org/status/401';
        return axiosInstance.post(
                url,
                {random}
            )
            .then(function ({data}) {
                console.log('parse data');
                return JSON.parse(data.data);
            })
    }
})

export default services;
