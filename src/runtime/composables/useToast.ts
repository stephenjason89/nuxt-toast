import type Toast from '../types/IziToast'
import { useNuxtApp } from '#app'

export function useToast(): Toast {
  if (import.meta.server) {
    return new Proxy({} as Toast, { get: () => () => {} }) // SSR Safe
  }
  return useNuxtApp().$iziToast
}
