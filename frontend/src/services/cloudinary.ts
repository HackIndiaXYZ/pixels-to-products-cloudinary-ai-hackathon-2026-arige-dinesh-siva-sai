/**
 * Cloudinary Transformation Helpers
 * Tailored for HackIndia PS-03 (Pixels to Products - Cloudinary AI)
 */

export const cloudinaryHelper = {
  getFaceCropUrl(url: string, width = 450, height = 450): string {
    if (!url) return '';
    if (url.includes('cloudinary.com')) {
      return url.replace('/image/upload/', `/image/upload/c_thumb,g_face,w_${width},h_${height},z_0.8,f_auto,q_auto/`);
    }
    // Dynamic fetch URL for external high-res images
    const encoded = encodeURIComponent(url);
    return `https://res.cloudinary.com/demo/image/fetch/c_thumb,g_face,w_${width},h_${height},z_0.85,f_auto,q_auto/${encoded}`;
  },

  getWatermarkedUrl(url: string, text = 'EVENTSNAP PREVIEW'): string {
    if (!url) return '';
    const encodedText = encodeURIComponent(text);
    const watermarkTransform = `l_text:helvetica_40_bold_letter_spacing_3:${encodedText},o_38,a_-30,co_rgb:ffffff,g_center`;
    
    if (url.includes('cloudinary.com')) {
      return url.replace('/image/upload/', `/image/upload/${watermarkTransform},f_auto,q_auto/`);
    }
    const encoded = encodeURIComponent(url);
    return `https://res.cloudinary.com/demo/image/fetch/${watermarkTransform},f_auto,q_auto/${encoded}`;
  },

  getOptimizedUrl(url: string, width = 1600): string {
    if (!url) return '';
    if (url.includes('cloudinary.com')) {
      return url.replace('/image/upload/', `/image/upload/w_${width},c_limit,f_auto,q_auto:good/`);
    }
    const encoded = encodeURIComponent(url);
    return `https://res.cloudinary.com/demo/image/fetch/w_${width},c_limit,f_auto,q_auto:good/${encoded}`;
  }
};
