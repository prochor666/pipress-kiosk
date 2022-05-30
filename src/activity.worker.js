import useApi from "./composables/use-api.js";
import utils from "./composables/utils.js";

// When the parent theard requires it, render the HTML
self.addEventListener("message", async ({ data }) => {

    const result = await useApi().getDeviceActivity();
    //console.log('Worker result', result);
    self.postMessage(utils().copyData(result));
});
