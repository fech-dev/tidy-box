import { defineConfig } from "cypress";
import { devServer } from '@cypress/vite-dev-server'
import { mergeConfig } from 'vite'
import { buildNuxt, loadNuxt } from "nuxt/kit";


async function getNuxtViteConfig() {
  let viteConfig;
  const nuxt = await loadNuxt({ dev: true, envName: 'test' })

  console.log('Resolving nuxt vite config')

  nuxt.hook('vite:extendConfig', ($viteConfig, { isClient }) => {
    if (isClient) {
      viteConfig = { ...$viteConfig }
    }
  })

  nuxt.hook('close', () => {
    console.log('Nuxt Vite Config resolved.')
  })

  await buildNuxt(nuxt)
  await nuxt.close()

  return viteConfig as unknown as object
}

const nuxtCypressViteDevServer: Cypress.DevServerFn = (devServerConfig) => {
  return devServer({
    ...devServerConfig,
    framework: 'vue',
    viteConfig: async () => {
      const nuxtViteConfig = await getNuxtViteConfig() //? can be cached?

      return mergeConfig(nuxtViteConfig, {
        //* Disable middleware mode, we don't need nitro for rendering components 
        appType: undefined,
        server: { middlewareMode: false }
      })
    }
  })
}

export default defineConfig({
  supportFolder: '.cypress/support',
  fixturesFolder: '.cypress/fixtures',
  videosFolder: '.cypress/videos',
  downloadsFolder: '.cypress/downloads',
  screenshotsFolder: '.cypress/screenshots',

  component: {
    devServer: nuxtCypressViteDevServer,
    specPattern: [
      'app/**/*.cy.ts',
      'layers/**/*.cy.ts'
    ],
    supportFile: '.cypress/support/component.ts',
    indexHtmlFile: '.cypress/support/component-index.html'
  },
});
