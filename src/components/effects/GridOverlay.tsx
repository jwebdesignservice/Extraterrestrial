'use client';

interface GridOverlayProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export default function GridOverlay({
  size = 50,
  color = '0, 255, 65',
  opacity = 0.03,
}: GridOverlayProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(${color}, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(${color}, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
