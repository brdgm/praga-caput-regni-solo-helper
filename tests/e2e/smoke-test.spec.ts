import { test, expect, Page } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Praga Caput Regni Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play a few rounds
  await nextStep(page)
  await nextStep(page)
  await nextStep(page)
  await nextStep(page)
  await nextStep(page)
  await nextStep(page)

  // abort game
  await page.getByRole('button', { name: 'Abort Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Abort Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Praga Caput Regni Solo Helper')
})

async function nextStep(page: Page) {
  const nextButton = page.getByRole('button', { name: 'Next' })
  if (await nextButton.isVisible()) {
    await nextButton.click()
  }
  const bothButton = page.getByRole('button', { name: 'Both' })
  if (await bothButton.isVisible()) {
    await bothButton.click()
  }
}
