import { createApp } from "vue";
import router from "@/router/router";
import directives from "@/directives";
import store from "@/store";

import "@/styles/style.sass";
import App from "./App.vue";
const app = createApp(App);

directives.forEach((directive) => {
    app.directive(directive.name, directive);
});

app.use(router).use(store).mount("#app");
