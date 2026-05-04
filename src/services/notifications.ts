// @ts-nocheck

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!("serviceWorker" in navigator)) return null;

    try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        return registration;
    } catch (error) {
        console.error("Service worker registration failed:", error);
        return null;
    }
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) return "denied";
    if (Notification.permission === "granted") return "granted";
    if (Notification.permission === "denied") return "denied";
    return Notification.requestPermission();
}

export async function sendLocalNotification(title: string, body: string): Promise<boolean> {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return false;

    const permission = await requestNotificationPermission();
    if (permission !== "granted") return false;

    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
        body,
        icon: "/favicon.svg",
        badge: "/favicon.svg",
        tag: "patient-alert",
        renotify: true,
    });

    return true;
}
