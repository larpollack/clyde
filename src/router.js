const Router = require("koa-router");
const router = new Router();
const model = require("./rhinoceros");
const { superstruct, struct } = require("superstruct");
const validate = require("koa-superstruct");

const rhinoSchema = superstruct({
  body: {
    id: "string",
    name: "string" && "string".length >= 1 && "string".length < 20,
    species: struct.enum([
      "white_rhinoceros",
      "black_rhinoceros",
      "indian_rhinoceros",
      "javan_rhinoceros",
      "sumatran_rhinoceros"
    ])
  }
});

router.get("/rhinoceros", (ctx, next) => {
  const rhinoceroses = model.getAll();
  ctx.response.body = { rhinoceroses };
});

router.post("/rhinoceros", validate(rhinoSchema), (ctx, next) => {
  ctx.response.body = model.newRhinoceros(ctx.request.body);
});

router.get("/rhinoceros/endangered", async (ctx, next) => {
  const endangered = await model
    .getAll()
    .filter(rhino => rhino.species.length >= 17);
  ctx.body = { endangered };
});

router.get("/rhinoceros/name/:name", async (ctx, next) => {
  const rhinoceroses = await model
    .getAll()
    .filter(rhino => rhino.name === ctx.params.name);
  ctx.body = { rhinoceroses };
});

router.get("/rhinoceros/species/:species", async (ctx, next) => {
  const rhinoceroses = await model
    .getAll()
    .filter(rhino => rhino.species === ctx.params.species);
  ctx.body = { rhinoceroses };
});

router.get("/rhinoceros/:id", async (ctx, next) => {
  const rhinoceros = await model
    .getAll()
    .filter(rhino => rhino.id === ctx.params.id);
  ctx.body = { rhinoceros };
});

module.exports = router;
