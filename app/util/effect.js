import { useEffect } from 'react'
import throttle from 'lodash/throttle'

const DEFAULT_TRIGGER_DISTANCE = 100

export const useScrollLoadMoreEffect =
  (callback, config = {}, callbackEffectDeps) => {
    useEffect(() => {
      const {
        triggerDistance = DEFAULT_TRIGGER_DISTANCE,
        enable = true
      } = config
      if (!enable) { return }
      const handleScroll = throttle(() => {
        const { scrollHeight } = document.body
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight
        if (clientHeight + scrollTop + triggerDistance >= scrollHeight) {
          callback()
        }
      }, 1000, {leading: true})
      document.addEventListener('scroll', handleScroll)
      return () => document.removeEventListener('scroll', handleScroll)
    }, callbackEffectDeps || [])
  }
