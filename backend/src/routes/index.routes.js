import router_notes from "./notes.routes.js";

const mainRoutes = (app) => {
    app.use(`/api/notes`, router_notes);
}

export default mainRoutes;