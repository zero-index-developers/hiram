const DURATION = 700;

export function animateThemeToggle(
  el: HTMLElement,
  toggleFn: () => void,
) {
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  if (!(document as any).startViewTransition) {
    toggleFn();
    return;
  }

  const transition = (document as any).startViewTransition(() => {
    toggleFn();
  });

  transition.ready.then(() => {
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: DURATION,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  });
}
