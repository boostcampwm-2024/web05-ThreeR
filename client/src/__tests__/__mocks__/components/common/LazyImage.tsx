interface LazyImageProps {
  src: string;
  alt: string;
  className: string;
  wrapperClassName: string;
}

export const mockLazyImage = {
  LazyImage: ({ src, alt, className, wrapperClassName }: LazyImageProps) => (
    <div className={wrapperClassName}>
      <img src={src} alt={alt} className={className} data-testid="lazy-image" />
    </div>
  ),
};
