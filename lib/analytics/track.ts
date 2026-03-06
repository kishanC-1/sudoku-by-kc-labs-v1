export async function trackEvent(eventType: string, metadata: Record<string, unknown> = {}) {
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, metadata, pagePath: window.location.pathname }),
    });
  } catch {
    // swallow to protect UX
  }
}
