# Adding Images

## Landing Page Image

The landing page is configured to display an electrician image on the right side.

1. **Add your image** to the `public` folder:
   - Name it: `electrician-working.jpg`
   - Path: `public/electrician-working.jpg`

2. **Image recommendations**:
   - Size: At least 1200x800px (or larger for better quality)
   - Format: JPG, PNG, or WebP
   - Content: Electrician working on electrical panel (wearing hard hat, safety vest, work gloves)
   - Style: Professional, well-lit, showing the electrician actively working
   - Aspect ratio: Portrait or landscape (will be cropped to fit)

3. **The image is already configured** in `app/[locale]/page.tsx`:
   - The code is ready to use `/electrician-working.jpg`
   - It will automatically fill the right section of the hero
   - Includes a subtle overlay for better text readability
   - If the image is missing, a blue gradient background will be displayed

4. **Free image sources**:
   - Unsplash: https://unsplash.com/s/photos/electrician
   - Pexels: https://www.pexels.com/search/electrician/
   - Pixabay: https://pixabay.com/images/search/electrician/

**IMPORTANT:** Once you add the image file `electrician-working.jpg` to the `public` folder, it will automatically appear on the landing page. Until then, a blue gradient background will be shown.

