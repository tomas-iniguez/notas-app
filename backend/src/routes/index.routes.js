import router_notes from "./notes.routes.js";
import router_users from "./users.routes.js";

const mainRoutes = (app) => {
    app.use(`/api/notes`, router_notes);
    app.use(`/api/users`, router_users);
}

export default mainRoutes;