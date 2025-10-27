import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'

import type { IziToastSettings } from 'izitoast'

export interface ModuleOptions {
  composableName?: string
  /**
   * Global iziToast settings that will be applied to all toasts.
   * See https://github.com/marcelodolza/iziToast for all available options
   */
  settings?: Partial<IziToastSettings>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-toast',
    configKey: 'toast',
    compatibility: { nuxt: '>=3.0.0' },
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.hook('vite:extend', ({ config }) => {
      (config.optimizeDeps ??= {}).include ??= []
      config.optimizeDeps.include.push('izitoast')
    })

    nuxt.options.runtimeConfig.public.nuxtToastSettings = options.settings || {}

    addPlugin({
      src: resolver.resolve('./runtime/plugin'),
      mode: 'client',
    })

    addImports({
      name: 'useToast',
      as: options.composableName ?? 'useToast',
      from: resolver.resolve('./runtime/composables/useToast'),
    })
  },
})
