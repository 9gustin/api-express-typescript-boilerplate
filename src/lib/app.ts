import cors from "cors";
import express, { Express } from "express";
import bodyParser from 'body-parser';
import fs from "fs";
import path from "path";
import { COMPONENTS_PATH, ROUTES_FILENAME } from "./constants";

class App {
  private instance: Express;

  constructor () {
    this.instance = express();
    this.useMiddlewares();
    this.useRoutes();
  }

  useMiddlewares() {
    this.instance.use(cors());
    this.instance.use(bodyParser.urlencoded({ extended: true }));
    this.instance.use(bodyParser.json());
  }

  //Read all routes files in components path
  useRoutes () {
    fs.readdir(COMPONENTS_PATH, (err, components) => {
      components.forEach(componentName => {
        const router = require(path.resolve(`${COMPONENTS_PATH}${componentName}/${ROUTES_FILENAME}`));
        this.instance.use(`/${componentName}`, router.routes);
      });
    })
  }

  start () {
    this.instance.listen(process.env.PORT);
  }
}

export default new App();
