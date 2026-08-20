/**
 * Gallery — CSS-columns masonry (2 cols on mobile → 4 on desktop) with a
 * lightweight lightbox: click/Enter to open, Esc to close, ← → to browse,
 * focus returns to the thumbnail you came from.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container, Eyebrow, Section, SectionHeading } from './ui.jsx';
import { useBodyScrollLock } from '../lib/utils.js';

export default function Gallery({ cafe }) {
  const { gallery } = cafe;
  const [index, setIndex] = useState(null);
  const open = index !== null;
  const triggersRef = useRef([]);
  const closeRef = useRef(null);

  useBodyScrollLock(open);

  const close = useCallback(() => {
    setIndex((current) => {
      triggersRef.current[current]?.focus();
      return null;
    });
  }, []);

  const step = useCallback(
    (delta) => setIndex((i) => (i + delta + gallery.photos.length) % gallery.photos.length),
    [gallery.photos.length],
  );

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  return (
    <Section id="gallery" labelledBy="gallery-heading">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{gallery.eyebrow}</Eyebrow>
            <SectionHeading id="gallery-heading" className="mt-5">
              {gallery.heading}
            </SectionHeading>
          </div>
          <p className="text-sm text-muted">
            Tap any photo to enlarge · {gallery.photos.length} shots from the room
          </p>
        </div>

        {/* masonry via CSS columns — no JS layout, no library */}
        <div className="mt-10 columns-2 gap-3 sm:gap-4 lg:columns-3 xl:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
          {gallery.photos.map((photo, i) => (
            <button
              key={photo.src + i}
              type="button"
              ref={(el) => {
                triggersRef.current[i] = el;
              }}
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-card border border-line bg-surface"
            >
              <span className="sr-only">Enlarge photo: {photo.alt}</span>
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{ aspectRatio: i % 3 === 0 ? '3 / 4' : i % 3 === 1 ? '1 / 1' : '4 / 5' }}
              />
            </button>
          ))}
        </div>
      </Container>

      {/* ------------------------------------------------------- lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-brand hover:text-brand"
          >
            <span className="sr-only">Close photo viewer</span>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => step(-1)}
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full border border-line bg-black/50 text-ink hover:border-brand hover:text-brand sm:left-6"
          >
            <span className="sr-only">Previous photo</span>
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>

          <figure className="max-h-[86svh] w-full max-w-4xl">
            <img
              src={gallery.photos[index].src}
              alt={gallery.photos[index].alt}
              className="mx-auto max-h-[76svh] w-auto rounded-card object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-muted">
              {gallery.photos[index].alt}
              <span className="ml-2 text-muted/60">
                {index + 1} / {gallery.photos.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => step(1)}
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full border border-line bg-black/50 text-ink hover:border-brand hover:text-brand sm:right-6"
          >
            <span className="sr-only">Next photo</span>
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      )}
    </Section>
  );
}
