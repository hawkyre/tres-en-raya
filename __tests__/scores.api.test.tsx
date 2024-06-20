import '@testing-library/jest-dom';
import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '../src/app/api/scores/route';

describe('API route: GET /api/scores', () => {
  it('should return a 200 status code', async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({ method: 'GET' });
        expect(response.status).toBe(200);
      },
    });
  });

  it('should return a json with 3 keys: player1, player2 and draw', async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({ method: 'GET' });
        const json = await response.json();

        expect(json).toHaveProperty('player1');
        expect(json).toHaveProperty('player2');
        expect(json).toHaveProperty('draw');
      },
    });
  });
});
