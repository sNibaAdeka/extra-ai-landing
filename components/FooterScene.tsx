"use client";

import { useEffect, useRef, useState } from "react";

export function FooterScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || typeof window === "undefined" || !("WebGLRenderingContext" in window)) {
      setUseFallback(true);
      return;
    }

    let disposed = false;
    let frame = 0;
    let teardown = () => {};

    async function init() {
      try {
        const THREE = await import("three");

        const canvasElement = canvasRef.current;

        if (disposed || !canvasElement) {
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0, 0.35, 7.4);

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas: canvasElement,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        const group = new THREE.Group();
        scene.add(group);

        scene.add(new THREE.AmbientLight(0xf5e4cc, 1.05));
        const keyLight = new THREE.PointLight(0xff7b4b, 4.2, 9);
        keyLight.position.set(-2.2, 2.1, 3.8);
        scene.add(keyLight);
        const fillLight = new THREE.PointLight(0xa855f7, 1.4, 8);
        fillLight.position.set(2.4, -1.4, 3.5);
        scene.add(fillLight);

        const ember = new THREE.MeshStandardMaterial({
          color: 0xff6b35,
          emissive: 0x8a220d,
          emissiveIntensity: 0.46,
          metalness: 0.28,
          roughness: 0.34,
        });
        const cream = new THREE.MeshStandardMaterial({
          color: 0xf5e4cc,
          emissive: 0x7a5032,
          emissiveIntensity: 0.32,
          metalness: 0.18,
          roughness: 0.24,
        });
        const edge = new THREE.LineBasicMaterial({
          color: 0xffc3a6,
          transparent: true,
          opacity: 0.24,
        });

        const segmentGeometry = new THREE.BoxGeometry(0.24, 0.24, 0.5);
        const segmentEdges = new THREE.EdgesGeometry(segmentGeometry);
        const cursorGeometry = new THREE.BoxGeometry(0.13, 1.65, 0.46);
        const cursorEdges = new THREE.EdgesGeometry(cursorGeometry);

        const addSegment = (x: number, y: number, scaleX = 1, scaleY = 1) => {
          const segment = new THREE.Mesh(segmentGeometry, ember);
          segment.position.set(x, y, 0.12);
          segment.scale.set(scaleX, scaleY, 1);
          group.add(segment);
          const outline = new THREE.LineSegments(segmentEdges, edge);
          outline.position.copy(segment.position);
          outline.scale.copy(segment.scale);
          group.add(outline);
          return segment;
        };

        const pieces = [
          addSegment(-1.1, 0, 1, 5.5),
          addSegment(-0.64, 0.78, 3.6, 1),
          addSegment(-0.64, -0.78, 3.6, 1),
          addSegment(1.1, 0, 1, 5.5),
          addSegment(0.64, 0.78, 3.6, 1),
          addSegment(0.64, -0.78, 3.6, 1),
        ];

        const cursor = new THREE.Mesh(cursorGeometry, cream);
        cursor.position.z = 0.18;
        group.add(cursor);
        const cursorOutline = new THREE.LineSegments(cursorEdges, edge);
        cursorOutline.position.copy(cursor.position);
        group.add(cursorOutline);

        const resize = () => {
          const parent = canvasElement.parentElement;
          if (!parent) {
            return;
          }

          const width = Math.max(parent.clientWidth, 1);
          const height = Math.max(parent.clientHeight, 1);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };

        const resizeObserver = new ResizeObserver(resize);
        if (canvasElement.parentElement) {
          resizeObserver.observe(canvasElement.parentElement);
        }
        resize();

        let markedReady = false;
        const render = (time: number) => {
          const elapsed = time * 0.001;
          group.rotation.x = -0.22 + Math.sin(elapsed * 0.62) * 0.025;
          group.rotation.y = 0.46 + Math.sin(elapsed * 0.5) * 0.055;
          group.rotation.z = -0.035 + Math.sin(elapsed * 0.42) * 0.014;
          group.position.y = Math.sin(elapsed * 0.58) * 0.045;
          cursor.scale.y = 0.96 + Math.sin(elapsed * 1.6) * 0.025;
          cursorOutline.scale.copy(cursor.scale);
          pieces.forEach((piece, index) => {
            piece.position.z = 0.12 + Math.sin(elapsed * 1.2 + index * 0.7) * 0.018;
          });

          renderer.render(scene, camera);

          if (!markedReady) {
            markedReady = true;
            setCanvasReady(true);
          }

          frame = window.requestAnimationFrame(render);
        };

        frame = window.requestAnimationFrame(render);

        teardown = () => {
          window.cancelAnimationFrame(frame);
          resizeObserver.disconnect();
          segmentGeometry.dispose();
          segmentEdges.dispose();
          cursorGeometry.dispose();
          cursorEdges.dispose();
          ember.dispose();
          cream.dispose();
          edge.dispose();
          renderer.dispose();
        };
      } catch {
        if (!disposed) {
          setUseFallback(true);
        }
      }
    }

    void init();

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return (
    <div
      className="footer-scene relative h-[260px] w-full overflow-hidden sm:h-[300px] lg:h-[360px]"
      aria-label="Extra AI 3D scanner mark"
    >
      <div
        aria-hidden
        className={`footer-scene-fallback absolute inset-0 transition-opacity duration-500 ${
          canvasReady && !useFallback ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="footer-scene-model">
          <span className="footer-scene-bracket footer-scene-bracket-left" />
          <span className="footer-scene-bracket footer-scene-bracket-right" />
          <span className="footer-scene-cursor" />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className={`relative h-full w-full transition-opacity duration-500 ${
          canvasReady ? "opacity-100" : "opacity-0"
        }`}
        data-footer-scene
      />
    </div>
  );
}
