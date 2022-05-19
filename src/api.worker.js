import useApi from "./composables/use-api.js";
import utils from "./composables/utils.js";

// When the parent theard requires it, render the HTML
self.addEventListener("message", async ({ data }) => {

    const result = await useApi().getDeviceData(data);
    //console.log('Worker before hash', result);
    self.postMessage(utils().copyData(result));
});
