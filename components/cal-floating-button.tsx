"use client"

import { useEffect } from "react"

const CAL_NAMESPACE = "30min"

const FLOATING_BUTTON_CONFIG = {
  calLink: "tanzil-convertive/30min",
  config: {
    layout: "month_view",
    useSlotsViewOnSmallScreen: "true",
  },
  buttonText: "Book a Demo",
  hideButtonIcon: false,
}

const UI_CONFIG = {
  hideEventTypeDetails: false,
  layout: "month_view",
}

function initCal() {
  const cal = (window as typeof window & { Cal?: any }).Cal
  if (typeof cal !== "function") return

  cal("init", CAL_NAMESPACE, { origin: "https://cal.com" })
  const namespacedCal = cal.ns?.[CAL_NAMESPACE]

  if (typeof namespacedCal === "function") {
    namespacedCal("floatingButton", FLOATING_BUTTON_CONFIG)
    namespacedCal("ui", UI_CONFIG)
    return
  }

  cal("floatingButton", FLOATING_BUTTON_CONFIG)
  cal("ui", UI_CONFIG)
}

export default function CalFloatingButton() {
  useEffect(() => {
    const state = window as typeof window & {
      __convertiveCalLoaded?: boolean
      __convertiveCalInitialized?: boolean
      Cal?: any
    }

    if (state.__convertiveCalInitialized) return

    const markAndInit = () => {
      if (state.__convertiveCalInitialized) return
      state.__convertiveCalInitialized = true
      initCal()
    }

    if (typeof state.Cal === "function") {
      markAndInit()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-convertive-cal="true"]')
    if (existingScript) {
      existingScript.addEventListener("load", markAndInit, { once: true })
      return () => existingScript.removeEventListener("load", markAndInit)
    }

    const script = document.createElement("script")
    script.src = "https://app.cal.com/embed/embed.js"
    script.async = true
    script.dataset.convertiveCal = "true"
    script.addEventListener("load", markAndInit, { once: true })
    document.head.appendChild(script)

    return () => script.removeEventListener("load", markAndInit)
  }, [])

  return null
}

