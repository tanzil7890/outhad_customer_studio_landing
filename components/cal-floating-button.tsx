"use client"

import Script from "next/script"

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
  return (
    <Script
      src="https://app.cal.com/embed/embed.js"
      strategy="lazyOnload"
      onLoad={initCal}
    />
  )
}
