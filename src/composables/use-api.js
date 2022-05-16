import axios from 'axios';
import { reactive } from 'vue';

export const useApi = function() {

    const getDeviceData = async function (apiUrl) {

        try {

            const data = {
                media: [],
                currencies: {},
                weather: {},
                index: 0,
                video: '',
                rest: {},
                lang: 'en',
            };

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
                            media: media = {},
                            currencies: currencies = {},
                            weather: weather = {},
                        }
                    },
                    ...rest
                } = result.data;

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
                //console.log('Reactive set', data);

                return data;
            }

        } catch (e) {

            console.log('Data error', e);
        }

        return data;
    };

    return {
        getDeviceData,
    };
};

export default useApi;
