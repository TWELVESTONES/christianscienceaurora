export interface AnalyticsAdapter { pageView(path: string): void; event(name: string, properties?: Record<string, string | number | boolean>): void; }
class NoopAnalyticsAdapter implements AnalyticsAdapter { pageView() { return; } event() { return; } }
export const analyticsAdapter: AnalyticsAdapter = new NoopAnalyticsAdapter();
