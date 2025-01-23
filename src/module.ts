import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'

export interface ModuleOptions {
  composableName?: string
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
