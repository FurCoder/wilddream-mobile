import React, { useState, useEffect, useMemo } from 'react'
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

export const useSimplePromise = ( promise, isHolding = false) => {
  const [result, setResult] = useState({ isLoading: true })
  useEffect(() => {
    if (isHolding) { return }
    setResult((r) => ({ ...r, isLoading: true, error: undefined }))
    let aborted = false
    promise.then(data => {
      if (aborted) { return }
      setResult({
        isLoading: false,
        data,
      })
    }, err => {
      if (aborted) { return }
      setResult({
        isLoading: false,
        error,
        errDetail: err
      })
    })
    return () => {
      aborted = true
    }
  }, [promise, isHolding])
  return {
    ...result,
    setResult
  }
}

export const useSimpleFetch = ( promiseGen, params) => {
  const paramsEffect = Object.entries(params).map(item => item[1]).concat(promiseGen)
  const promise = useMemo(() => promiseGen(params), paramsEffect)
  const { isLoading, data, setResult } = useSimplePromise(promise)
  const refresh = (newParams) => {
    setResult(prev => ({...prev, isLoading: true}))
    promiseGen(newParams || params).then(data => {
      setResult(prev => ({...prev, isLoading: false, data}))
    })
  }
  return [ isLoading, data, refresh]
}