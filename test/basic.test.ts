import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils/e2e'

describe('Basic Page Rendering', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    browser: true,
  })

  it('renders the page and displays iziToast notification', async () => {
    const page = await createPage('/')

    await page.waitForSelector('.iziToast-message')

    const toastText = await page.textContent('.iziToast-message')
    expect(toastText).toContain('Success message')
  })
})
