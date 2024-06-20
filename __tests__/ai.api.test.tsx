import '@testing-library/jest-dom';
import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '../src/app/api/ai/move/route';

describe('API route: GET /api/ai/move', () => {
  it('should return a 201 status code', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/ai/move',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({ board: '_________' }),
        });
        expect(response.status).toBe(201);
      },
    });
  });

  it('should return nextBoard and result', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/ai/move',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({ board: '_________' }),
        });
        const json = await response.json();
        expect(response.status).toBe(201);
        expect(json).toHaveProperty('nextBoard');
        expect(json).toHaveProperty('result');
      },
    });
  });

  it('should return 400 on wrong board format', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/ai/move',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({ board: '_' }),
        });
        expect(response.status).toBe(400);
      },
    });
  });

  it('should return 400 on no board', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/ai/move',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
        });
        expect(response.status).toBe(400);
      },
    });
  });

  it('should return 400 on wrong board characters', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/ai/move',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({ board: 'ASDASDASD' }),
        });
        expect(response.status).toBe(400);
      },
    });
  });

  it('should handle an empty board properly', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/ai/move',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({ board: '_________' }),
        });
        const json = await response.json();

        const { nextBoard, result } = json as {
          nextBoard: string;
          result: string;
        };

        expect(nextBoard.length).toBe(9);
        expect(nextBoard.includes('O')).toBe(true);
        expect(nextBoard.includes('X')).toBe(false);
        expect(result).toBe('playing');
      },
    });
  });

  it('should play the best move on horizontal XXs', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/ai/move',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({ board: 'XX______O' }),
        });
        const json = await response.json();

        const { nextBoard, result } = json as {
          nextBoard: string;
          result: string;
        };

        expect(nextBoard).toBe('XXO_____O');
        expect(result).toBe('playing');
      },
    });
  });

  it('should play the best move on vertical XXs', async () => {
    await testApiHandler({
      appHandler,
      url: '/api/ai/move',
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify({ board: 'X___O_X__' }),
        });
        const json = await response.json();

        const { nextBoard, result } = json as {
          nextBoard: string;
          result: string;
        };

        expect(nextBoard).toBe('X__OO_X__');
        expect(result).toBe('playing');
      },
    });
  });

  it('should detect wins from player 1 and return unchanged board', async () => {
    const somePlayer1Wins = ['XXXO_OO__', 'X_OXOOX__', 'XOOOX___X'];
    await Promise.all(
      somePlayer1Wins.map(async (board) => {
        await testApiHandler({
          appHandler,
          url: `/api/ai/move`,
          test: async ({ fetch }) => {
            const response = await fetch({
              method: 'POST',
              body: JSON.stringify({ board }),
            });
            const json = await response.json();

            const { nextBoard, result } = json as {
              nextBoard: string;
              result: string;
            };

            expect(nextBoard).toBe(board);
            expect(result).toBe('player1');
          },
        });
      })
    );
  });

  it('should detect wins from player 2 and return unchanged board', async () => {
    const somePlayer2Wins = ['_OXXO_XO_', 'OOOXX___X', 'XXOXO_O__'];
    await Promise.all(
      somePlayer2Wins.map(async (board) => {
        await testApiHandler({
          appHandler,
          url: `/api/ai/move`,
          test: async ({ fetch }) => {
            const response = await fetch({
              method: 'POST',
              body: JSON.stringify({ board }),
            });
            const json = await response.json();

            const { nextBoard, result } = json as {
              nextBoard: string;
              result: string;
            };

            expect(nextBoard).toBe(board);
            expect(result).toBe('player2');
          },
        });
      })
    );
  });

  it('should detect draws and return unchanged board', async () => {
    const someDraws = ['XOXOXOOXO', 'XXOOOXXOO', 'XXOOOXXOX'];
    await Promise.all(
      someDraws.map(async (board) => {
        return await testApiHandler({
          appHandler,
          url: `/api/ai/move`,
          test: async ({ fetch }) => {
            const response = await fetch({
              method: 'POST',
              body: JSON.stringify({ board }),
            });
            const json = await response.json();

            const { nextBoard, result } = json as {
              nextBoard: string;
              result: string;
            };

            expect(nextBoard).toBe(board);
            expect(result).toBe('draw');
          },
        });
      })
    );
  });
});
