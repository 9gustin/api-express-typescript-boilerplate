import { Request, Response, Router } from "express";

const routes = Router();

routes.get('/example', (request: Request, response: Response) => response.send('example'));

export { routes };