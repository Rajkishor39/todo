import { describe, it, expect, beforeEach } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import routes from "@/routs.js";
import { createApp } from "vue";

describe("Vue Router Configuration", () => {
    let router;

    beforeEach(async () => {
        router = createRouter({
            history: createMemoryHistory(),
            routes: routes.options.routes, 
        });
        const app = createApp({});
        app.use(router);
        await router.isReady();
    });

    it("should have the correct routes", () => {
        const Routes = router.getRoutes().map(route => route.path);

        expect(Routes).toContain("/");
        expect(Routes).toContain("/todo");
        expect(Routes).toContain("/about");
        expect(Routes).toContain("/inc");
       
    });

    it("navigate to the home page", async () => {
        await router.push("/");
        expect(router.currentRoute.value.name).toBe("home");
    });

    it("navigate to the TodoList page", async () => {
        await router.push("/todo");
        expect(router.currentRoute.value.name).toBe("TodoList");
    });

    it("navigate to the About page", async () => {
        await router.push("/about");
        expect(router.currentRoute.value.name).toBe("About");
    });

    it("navigate to the Counter page", async () => {
        await router.push("/inc");
        expect(router.currentRoute.value.name).toBe("incre");
    });

    
});
