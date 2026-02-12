import swaggerUi from "swagger-ui-express"

import swaggerDoc from "../docs/swagger.json"

export const swaggerSetup = (app: any) => {
  console.log("Swagger setup loaded");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
// export const swaggerSetup = (app: any) => {
//   app.get("/api-docs", (_req:Request, _res:Response) => {
//     // _res.send("Swagger route working");
//     return console.log("swagger route working");
    
//   });
// };