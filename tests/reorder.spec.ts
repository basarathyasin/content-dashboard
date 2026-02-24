import { test, expect } from '@playwright/test';

test('user can reorder content cards', async ({ page }) => {
  await page.goto('http://localhost:3000/feed');

  const cards = page.locator('.content-card');

  await expect(cards.first()).toBeVisible();

  const firstCard = cards.nth(0);
  const secondCard = cards.nth(1);

  const firstTitle = await firstCard.textContent();

  // Get bounding boxes
  const firstBox = await firstCard.boundingBox();
  const secondBox = await secondCard.boundingBox();

  if (!firstBox || !secondBox) throw new Error('Cards not found');

  // Simulate pointer drag
  await page.mouse.move(firstBox.x + 10, firstBox.y + 10);
  await page.mouse.down();
  await page.mouse.move(secondBox.x + 10, secondBox.y + 10);
  await page.mouse.up();

  // Wait for DOM update
  await page.waitForTimeout(500);

  const newFirstTitle = await cards.nth(0).textContent();

  expect(newFirstTitle).not.toBe(firstTitle);
});