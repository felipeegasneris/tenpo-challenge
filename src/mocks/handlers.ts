import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/callback/credentials', async ({ request }) => {
    const data = await request.json();
    
    if (data.email === 'test@example.com' && data.password === 'test123') {
      return HttpResponse.json({
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User'
        }
      });
    }
    
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized'
    });
  })
];