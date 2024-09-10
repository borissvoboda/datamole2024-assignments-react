const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
    }
    next();
});

server.patch("/done/:id", (req, res) => {
    const items = router.db.get(`items`);
    const selectedItem = items.find({ id: Number(req.params.id) }).value();
    if (!selectedItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    const updatedItem = {
        ...selectedItem,
        isDone: true,
        finishedAt: Date.now(),
    };

    items
        .find({ id: Number(req.params.id) })
        .assign(updatedItem)
        .write();

    return res.status(200).json(updatedItem);
});

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running");
});
