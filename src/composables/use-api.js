import axios from 'axios';

export const useApi = function() {

    const getDeviceData = async function (apiUrl) {

        const data = {
            clock: {},
            media: {
                url: '',
                files: [],
            },
            currencies: {},
            weather: {},
            index: 0,
            video: '',
            rest: {
                geo: {
                    geoip: {
                        ip: '',
                        city: '',
                        location: {
                            time_zone: '',
                        },
                    },
                },
            },
            lang: 'en',
            offline: true,
        };

        try {

            const result = await axios.get(`${apiUrl}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (typeof (result) === 'object' && result.data && result.data.status) {

                let {
                    lang,
                    layout: {
                        orientation: orientation = 'vertical',
                        widgets: widgets = [],
                        data: {
                            clock: clock = {},
                            media: media = {},
                            currencies: currencies = {},
                            weather: weather = {},
                        }
                    },
                    ...rest
                } = result.data;

                if (clock) {

                    data.clock = clock;
                }
                if (media) {

                    data.media = media;
                }
                if (currencies) {

                    data.currencies = currencies;
                }
                if (weather) {

                    data.weather = weather;
                }
                if (rest) {

                    data.rest = rest;
                }
                if (lang) {

                    data.lang = lang;
                }
                if (orientation) {

                    data.orientation = orientation;
                }
                if (widgets) {

                    data.widgets = widgets;
                }

                data.offline = false;
                return data;
            }

        } catch (e) {

            data.offline = true;
            console.log('Data error', e);
        }

        return data;
    };

    return {

        getDeviceData,
    };
};

export default useApi;
