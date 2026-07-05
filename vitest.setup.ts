import "@testing-library/jest-dom/vitest";

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// framer-motion's whileInView relies on IntersectionObserver, which jsdom
// does not implement.
globalThis.IntersectionObserver = MockIntersectionObserver;
globalThis.ResizeObserver = MockResizeObserver;

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () =>
    ({
      setTransform() {},
      clearRect() {},
      fillRect() {},
      fillStyle: "",
    }) as unknown as CanvasRenderingContext2D,
});
