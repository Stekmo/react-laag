import * as React from "react";

type EventListenable = {
  addEventListener: any;
  removeEventListener: any;
};

export default function useEvent<T extends EventListener>(
  element: EventListenable | EventListenable[] | null,
  event: string | string[],
  callback: T,
  enabled = true
) {
  return React.useEffect(() => {
    if (!enabled || !element) {
      return;
    }

    const cb = callback;

    const el = Array.isArray(element) ? element : [element];
    const ev = Array.isArray(event) ? event : [event];

    el.forEach(e => {
      ev.forEach(event => {
        e.addEventListener(event as any, cb);
      });
    });

    return () => {
      el.forEach(e => {
        ev.forEach(event => {
          e.removeEventListener(event as any, cb);
        });
      });
    };
  }, [callback, element, enabled, event]);
}
