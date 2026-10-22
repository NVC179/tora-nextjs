import { expect, test } from '@playwright/test'

test('home exposes all sections on every visit', async ({ page, isMobile }) => {
  await page.goto('/')
  const navigation = page.getByRole('navigation', { name: isMobile ? 'Khám phá tôra studio' : 'Menu chính', exact: true })
  for (const section of ['works', 'journal', 'shop', 'studio']) {
    await expect(navigation.getByRole('link', { name: section, exact: true })).toBeVisible()
  }
  await navigation.getByRole('link', { name: 'works', exact: true }).click()
  await expect(page).toHaveURL('/works')
  await page.goBack()
  await expect(page).toHaveURL('/')
  await expect(navigation.getByRole('link', { name: 'works', exact: true })).toBeVisible()
  await page.reload()
  await expect(navigation.getByRole('link', { name: 'works', exact: true })).toBeVisible()
})

test('browser back and forward follow home, list, detail without extra history', async ({ page, isMobile }) => {
  await page.goto('/')
  const navigation = page.getByRole('navigation', { name: isMobile ? 'Khám phá tôra studio' : 'Menu chính', exact: true })
  await navigation.getByRole('link', { name: 'works', exact: true }).click()
  await expect(page).toHaveURL('/works')
  const project = page.locator('.project-item').last()
  const destination = await project.getAttribute('href')
  await project.scrollIntoViewIfNeeded()
  const listScroll = await page.evaluate(() => window.scrollY)
  await project.click()
  await expect(page).toHaveURL(destination!)
  await expect(page.locator('.project-detail')).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL('/works')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(listScroll, -1)
  await page.goForward()
  await expect(page).toHaveURL(destination!)
  await page.getByRole('link', { name: '← Back to works' }).filter({ visible: true }).click()
  await expect(page).toHaveURL('/works')
  await page.goBack()
  await expect(page).toHaveURL('/')
})

test('direct detail links survive reload and return to their section', async ({ page }) => {
  await page.goto('/works/1')
  await page.reload()
  await expect(page.locator('.project-detail')).toBeVisible()
  await page.getByRole('link', { name: '← Back to works' }).filter({ visible: true }).click()
  await expect(page).toHaveURL('/works')
  await page.goto('/works/missing')
  await expect(page.getByRole('heading', { name: 'Trang không tìm thấy' })).toBeVisible()
})

test('gallery loads on demand and supports opening and closing', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/works/1')
  await expect(page.locator('.lg-container')).toHaveCount(0)
  await expect(page.locator('.gallery-image').first()).toHaveAttribute('src', /\/_next\/image/)
  await page.locator('.gallery-item').nth(2).click()
  await expect(page.locator('.lg-outer')).toBeVisible()
  await page.locator('.lg-close').click()
  await expect(page.locator('.lg-outer')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('mobile menu supports Escape, swipe dismissal and viewport changes', async ({ page, isMobile }) => {
  test.skip(!isMobile)
  await page.goto('/works')
  const toggle = page.getByRole('button', { name: 'Mở menu' })
  await toggle.click()
  await expect(page.getByRole('button', { name: 'Đóng menu' })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await toggle.click()
  const menu = page.locator('#mobile-navigation')
  await menu.evaluate(element => {
    const start = new Touch({ identifier: 1, target: element, clientX: 280, clientY: 140 })
    const end = new Touch({ identifier: 1, target: element, clientX: 100, clientY: 145 })
    element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [start] }))
    element.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [end] }))
  })
  await expect(menu).toBeHidden()
  await toggle.click()
  await page.setViewportSize({ width: 1100, height: 900 })
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('')
})

test('contact dialog closes with Escape and restores scrolling', async ({ page }) => {
  await page.goto('/shop/1')
  await page.getByRole('button', { name: 'Mua hàng' }).click()
  await expect(page.getByRole('dialog', { name: 'Liên hệ mua hàng' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('')
})

test('layouts fit narrow mobile, tablet and desktop screens', async ({ page }, testInfo) => {
  test.setTimeout(60_000)
  for (const width of [320, 390, 768, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/', '/works', '/works/1', '/studio']) {
      await page.goto(path, { waitUntil: 'domcontentloaded' })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      if ((width === 390 || width === 1440) && (path === '/' || path === '/works/1')) {
        await page.screenshot({ path: testInfo.outputPath(`${width}-${path === '/' ? 'home' : 'detail'}.png`) })
      }
    }
  }
})
