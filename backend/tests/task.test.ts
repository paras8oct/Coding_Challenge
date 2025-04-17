import request, { Response } from 'supertest';
import app from '../src/app'; // Adjust path as needed

let taskId: string = '';

beforeAll(async () => {
  const res = await request(app)
    .post('/api/tasks')
    .send({
      "name": "task2",
      "due": "2026-04-16T06:04:32.014Z",
      "complete": true,
      "description": "for testing"
    });
  const parsed = JSON.parse(res.text);
  taskId = parsed._id;
});

it('PUT /api/tasks/:id - update task', async () => {
  const res: Response = await request(app)
    .put(`/api/tasks/${taskId}`)
    .send({ complete: true });

  expect(res.status).toBe(200);
  expect(res.body).toEqual({ message: 'Updated successfully' });
});