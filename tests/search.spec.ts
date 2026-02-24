import { test, expect } from '@playwright/test';

test('search filters trending content', async ({ page }) => {

  // 🔥 Intercept News API
  await page.route('**newsapi.org/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        articles: [
          {
            title: 'AI Revolution',
            description: 'AI is everywhere',
            url: '',
            urlToImage: '',
          },
        ],
      }),
    });
  });

  // 🔥 Intercept TMDB API
  await page.route('**api.themoviedb.org/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        results: [],
      }),
    });
  });

  await page.goto('http://localhost:3000/feed', { waitUntil: 'networkidle' });

  const searchInput = page.getByTestId('search-input');
  await expect(searchInput).toBeVisible();

  await searchInput.fill('AI');

  await expect(page.getByText('AI Revolution')).toBeVisible();
});