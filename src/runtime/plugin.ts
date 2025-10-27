import type { IziToastSettings } from 'izitoast'
import * as iziToastModule from 'izitoast'
import type Toast from './types/IziToast.ts'
import 'izitoast/dist/css/iziToast.min.css'
import { defineNuxtPlugin } from '#app'

const globalToast
  = typeof window !== 'undefined' && 'iziToast' in window ? window.iziToast : undefined
const iziToast = iziToastModule.default ?? globalToast ?? iziToastModule

export default defineNuxtPlugin(() => {
  const THEMES = {
    info: { color: 'blue', icon: 'ico-info' },
    success: { color: 'green', icon: 'ico-success' },
    warning: { color: 'orange', icon: 'ico-warning' },
    error: { color: 'red', icon: 'ico-error' },
    question: { color: 'yellow', icon: 'ico-question' },
  }

  return {
    provide: {
      iziToast: {
        ...iziToast,
        hideToast(title: string, message: string, status: keyof typeof THEMES) {
          const color = THEMES[status].color
          const newId = btoa(encodeURIComponent(`${title}${message}${color}`)).replace(/=/g, '')

          document
            .querySelectorAll(`.iziToast#${newId}`)
            .forEach(
              element =>
                element instanceof HTMLDivElement
                && iziToast.hide({ title, message, id: newId }, element, 'replaced'),
            )
        },
        data(data: IziToastSettings & { status: keyof typeof THEMES }) {
          iziToast.show({
            ...data,
            color: THEMES[data.status]?.color,
            icon: THEMES[data.status]?.icon,
            timeout: data.timeout ?? 2500,
          })
        },
      } as Toast,
    },
  }
})
