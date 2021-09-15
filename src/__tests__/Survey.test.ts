import request from "supertest";
import { getConnectionOptions } from "typeorm";
import { app } from "../app";
import {getConnection} from "typeorm";

 import createConnecion from "../database";

 describe("Surveys", () => {
     beforeAll(async () => {
         const Connection = await createConnecion();
         await Connection.runMigrations();
     });

     afterAll(async () => {

      const connection = getConnection();
      await connection.dropDatabase();
      await connection.close();

     });

     it("Should be able to create a new survey", async () => {
         const response =   await request(app).post("/surveys").send({
             title: "Title Example",
             description: "Description Example",
         })
         expect(response.status).toBe(201);
         expect(response.body).toHaveProperty("id");
     })

     it("Should be able to get all  surveys", async () => {
         await request(app).post("/surveys").send({
            title: "Title Example2",
            description: "Description Example2",
        })
          const response = await request(app).get("/surveys");

          expect(response.body.length).toBe(2);
     })
 });