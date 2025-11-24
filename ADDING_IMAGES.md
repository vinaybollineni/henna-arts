# How to Add Your Instagram Images to the Website 📸

Since Instagram images are protected by copyright and terms of service, you'll need to manually download and add your own images from your account [@meghnas_henna_arts](https://www.instagram.com/meghnas_henna_arts/).

## Step 1: Download Images from Your Instagram

### Option A: Using Instagram App (Recommended)
1. Open Instagram app on your phone
2. Go to your profile [@meghnas_henna_arts](https://www.instagram.com/meghnas_henna_arts/)
3. Open any post you want to use
4. Tap the three dots (•••) in the top right
5. Select "Save" or "Download" (depending on your device)
6. The image will be saved to your photo library

### Option B: Using Instagram on Desktop
1. Go to [instagram.com/meghnas_henna_arts](https://www.instagram.com/meghnas_henna_arts/)
2. Log in to your account
3. Click on the post you want to download
4. Right-click on the image and select "Save Image As..."
5. Save it to your computer

### Option C: Using Your Original Photos
Since you're the creator, you likely have the original high-quality photos on your device before you uploaded them to Instagram. Use those for best quality!

## Step 2: Prepare Your Images

1. **Rename your images** to something descriptive:
   - `bridal-design-1.jpg`
   - `bridal-design-2.jpg`
   - `party-henna-1.jpg`
   - `custom-design-1.jpg`
   - etc.

2. **Optimize images for web** (optional but recommended):
   - Resize to max 1200px width
   - Compress to reduce file size
   - Use tools like TinyPNG or ImageOptim

3. **Organize by category**:
   - Bridal designs
   - Party/event designs
   - Prenatal/belly art
   - Custom designs

## Step 3: Add Images to Your Repository

### Method A: Using GitHub Web Interface (Easiest)

1. Go to: https://github.com/vinaybollineni/henna-arts
2. Navigate to the `images/gallery` folder
3. Click "Add file" → "Upload files"
4. Drag and drop your renamed images
5. Add a commit message like "Add gallery images"
6. Click "Commit changes"

### Method B: Using Git Command Line

```bash
# Navigate to your project
cd /Users/vinaybollineni/henna-arts/henna-arts

# Copy your images to the images/gallery folder
cp ~/Downloads/your-image.jpg images/gallery/

# Add and commit
git add images/gallery/
git commit -m "Add henna design gallery images"
git push origin main
```

## Step 4: Update the HTML Code

Once your images are uploaded, you need to update `index.html` to display them.

### Find the Gallery Section

Look for this section in `index.html` (around line 200):

```html
<div class="gallery-grid">
    <!-- Placeholder gallery items -->
    <div class="gallery-item" data-category="bridal">
        <div class="gallery-placeholder">
            <i class="fas fa-image"></i>
            <p>Bridal Design 1</p>
        </div>
    </div>
    ...
</div>
```

### Replace with Actual Images

Replace each placeholder with actual image tags:

```html
<div class="gallery-grid">
    <!-- Bridal Designs -->
    <div class="gallery-item" data-category="bridal">
        <img src="images/gallery/bridal-design-1.jpg" alt="Elegant bridal henna design with intricate patterns">
    </div>
    <div class="gallery-item" data-category="bridal">
        <img src="images/gallery/bridal-design-2.jpg" alt="Traditional bridal mehndi with floral motifs">
    </div>
    
    <!-- Party Designs -->
    <div class="gallery-item" data-category="party">
        <img src="images/gallery/party-henna-1.jpg" alt="Quick party henna design">
    </div>
    <div class="gallery-item" data-category="party">
        <img src="images/gallery/party-henna-2.jpg" alt="Festival celebration henna">
    </div>
    
    <!-- Custom Designs -->
    <div class="gallery-item" data-category="custom">
        <img src="images/gallery/custom-design-1.jpg" alt="Custom personalized henna art">
    </div>
    <div class="gallery-item" data-category="custom">
        <img src="images/gallery/custom-design-2.jpg" alt="Modern fusion henna design">
    </div>
    
    <!-- Prenatal Designs -->
    <div class="gallery-item" data-category="prenatal">
        <img src="images/gallery/prenatal-belly-1.jpg" alt="Beautiful prenatal belly henna art">
    </div>
    <div class="gallery-item" data-category="prenatal">
        <img src="images/gallery/prenatal-belly-2.jpg" alt="Baby-themed belly henna design">
    </div>
</div>
```

### Add CSS for Images (Already included, but verify)

Make sure your `styles.css` has these styles:

```css
.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
```

## Step 5: Add a Filter Category for Prenatal

If you want a prenatal/belly art category, add this button to the gallery filters section:

```html
<div class="gallery-filters">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="bridal">Bridal</button>
    <button class="filter-btn" data-filter="party">Party</button>
    <button class="filter-btn" data-filter="prenatal">Prenatal</button>
    <button class="filter-btn" data-filter="custom">Custom</button>
</div>
```

## Step 6: Commit and Push Changes

After updating the HTML:

```bash
git add index.html
git commit -m "Update gallery with actual henna design images"
git push origin main
```

## Recommended Image Specifications

- **Format**: JPG or WebP for photos
- **Size**: 1200px × 1200px (square) or 1200px × 1600px (portrait)
- **File size**: Under 500KB per image
- **Quality**: 80-85% compression
- **Alt text**: Descriptive text for accessibility

## Quick Start: Download 8-12 Images

For a good starting gallery, I recommend:
- 3-4 bridal henna images
- 2-3 party/event images
- 2-3 custom design images
- 1-2 prenatal images (if applicable)

This gives a nice variety without overwhelming the page.

## Need Help?

If you need assistance updating the HTML code after uploading your images, just let me know and I can help you modify the gallery section!

---

**Note**: Your Instagram link ([@meghnas_henna_arts](https://www.instagram.com/meghnas_henna_arts/)) is now live on your website in both the contact section and footer! 🎉

