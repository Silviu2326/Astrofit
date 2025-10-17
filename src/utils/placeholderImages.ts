/**
 * Utility functions for generating placeholder images
 * This replaces external placeholder services like via.placeholder.com
 */

export interface PlaceholderOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  text?: string;
  format?: 'svg' | 'data-url';
}

/**
 * Generates a placeholder image as an SVG data URL
 */
export function generatePlaceholderImage(options: PlaceholderOptions = {}): string {
  const {
    width = 150,
    height = 150,
    backgroundColor = '#CCCCCC',
    textColor = '#666666',
    text = `${width}x${height}`,
    format = 'data-url'
  } = options;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" 
            fill="${textColor}" text-anchor="middle" dy=".3em">
        ${text}
      </text>
    </svg>
  `;

  if (format === 'data-url') {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
  
  return svg;
}

/**
 * Common placeholder images used throughout the app
 */
export const PlaceholderImages = {
  // User avatars
  avatar: (size: number = 150) => generatePlaceholderImage({
    width: size,
    height: size,
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    text: 'Avatar'
  }),

  // Product images
  product: (size: number = 300) => generatePlaceholderImage({
    width: size,
    height: size,
    backgroundColor: '#F3F4F6',
    textColor: '#6B7280',
    text: 'Product'
  }),

  // File thumbnails
  pdf: () => generatePlaceholderImage({
    width: 150,
    height: 150,
    backgroundColor: '#EF4444',
    textColor: '#FFFFFF',
    text: 'PDF'
  }),

  jpg: () => generatePlaceholderImage({
    width: 150,
    height: 150,
    backgroundColor: '#10B981',
    textColor: '#FFFFFF',
    text: 'JPG'
  }),

  png: () => generatePlaceholderImage({
    width: 150,
    height: 150,
    backgroundColor: '#F59E0B',
    textColor: '#000000',
    text: 'PNG'
  }),

  // Video thumbnails
  video: () => generatePlaceholderImage({
    width: 150,
    height: 150,
    backgroundColor: '#8B5CF6',
    textColor: '#FFFFFF',
    text: 'Video'
  }),

  // Logo placeholders
  logo: (size: number = 100) => generatePlaceholderImage({
    width: size,
    height: size,
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    text: 'Logo'
  }),

  // Generic placeholder
  generic: (width: number = 150, height: number = 150, text?: string) => 
    generatePlaceholderImage({
      width,
      height,
      backgroundColor: '#E5E7EB',
      textColor: '#6B7280',
      text: text || `${width}x${height}`
    }),

  // Email template thumbnails
  emailTemplate: (color: string, text: string) => generatePlaceholderImage({
    width: 150,
    height: 150,
    backgroundColor: color,
    textColor: '#FFFFFF',
    text: text
  }),

  // Coach photos
  coach: (initials: string) => generatePlaceholderImage({
    width: 150,
    height: 150,
    backgroundColor: '#059669',
    textColor: '#FFFFFF',
    text: initials
  }),

  // Client photos
  client: (initials: string) => generatePlaceholderImage({
    width: 150,
    height: 150,
    backgroundColor: '#7C3AED',
    textColor: '#FFFFFF',
    text: initials
  }),

  // Company logos
  companyLogo: (initials: string) => generatePlaceholderImage({
    width: 150,
    height: 150,
    backgroundColor: '#DC2626',
    textColor: '#FFFFFF',
    text: initials
  })
};

/**
 * Fallback function for when external images fail to load
 */
export function getImageFallback(src: string, fallbackType: keyof typeof PlaceholderImages = 'generic'): string {
  // If it's already a data URL or local image, return as is
  if (src.startsWith('data:') || src.startsWith('/') || src.startsWith('./')) {
    return src;
  }
  
  // Return appropriate fallback based on context
  switch (fallbackType) {
    case 'generic':
      return PlaceholderImages.generic();
    case 'avatar':
      return PlaceholderImages.avatar();
    case 'product':
      return PlaceholderImages.product();
    case 'logo':
      return PlaceholderImages.logo();
    default:
      return PlaceholderImages.generic();
  }
}
