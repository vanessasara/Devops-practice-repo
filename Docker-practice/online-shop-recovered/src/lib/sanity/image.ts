import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/client';
import { client } from './client';

const builder = imageUrlBuilder(client);

/**
 * Helper function to generate optimized image URLs from Sanity image sources
 * @param source - Sanity image object or reference
 * @returns Image URL builder instance
 *
 * @example
 * // Basic usage
 * const url = urlFor(image).url()
 *
 * // With transformations
 * const url = urlFor(image)
 *   .width(800)
 *   .height(600)
 *   .auto('format')
 *   .url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Generate a responsive image URL with optimal dimensions
 * @param source - Sanity image object
 * @param width - Desired width in pixels
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
export function getImageUrl(
  source: SanityImageSource,
  width: number = 800,
  quality: number = 85
): string {
  return urlFor(source)
    .width(width)
    .quality(quality)
    .auto('format')
    .url();
}
