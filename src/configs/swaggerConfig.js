import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    swagger: "2.0", // Sử dụng Swagger 2.0 để đồng bộ với swaggerOutput.json
    info: {
      title: "GUYFORM API",
      version: "1.0.0",
      description: "API document for GUYFORM e-commerce platform",
    },
    host: "localhost:3000",
    basePath: "/api",
    schemes: ["http"],
  },
  apis: ["./src/routes/*.js"], // Đọc các file route
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;