import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  // Each playthrough drives a real ~45s game session with framer-motion
  // animations and drag interactions; running them concurrently starves
  // each other of CPU and produces spurious "stuck" failures. Serial is
  // slower but reliable — there are only a handful of these tests.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    // 1280x900: a 720 de alto el mazo del puzzle de faraones queda al borde de la
    // pantalla y el arrastre del test no suelta (ver el hallazgo de la auditoría).
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
})
