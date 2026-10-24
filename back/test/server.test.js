const request = require("supertest");
const app = require("../server");

describe("Task API", () => {
    test("GET /tasks rejects unauthenticated requests", async () => {
        const response = await request(app).get("/tasks");

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Unauthorized");
    });
});
