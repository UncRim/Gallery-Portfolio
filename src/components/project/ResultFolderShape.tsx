interface ResultFolderShapeProps {
  className?: string
}

/**
 * Folder card chrome traced from the exported Result component (292×232).
 * Back layer includes the tab + diagonal edge; front layer is the main body.
 */
export function ResultFolderShape({ className }: ResultFolderShapeProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 292 232"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="post-result-folder-shape-back"
        d="M20 0H102L128 28H268C286 28 292 38 292 54V210C292 226 278 232 268 232H24C10 232 0 222 0 208V20C0 6 10 0 20 0Z"
      />
      <path
        className="post-result-folder-shape-front"
        d="M128 28H268C286 28 292 38 292 54V210C292 226 278 232 268 232H24C10 232 0 222 0 208V48C0 34 10 28 24 28H128Z"
      />
    </svg>
  )
}
