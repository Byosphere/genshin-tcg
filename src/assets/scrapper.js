// WEBSITE: https://maxcard123.com/collections/genshin-impact-genius-invokation-tcg-tier-4?page=8

(function downloadAllImages() {
  const images = document.querySelectorAll("img.transition2");

  if (images.length === 0) {
    console.log("No images found on this page.");
    return;
  }

  console.log(`Found ${images.length} images. Starting download...`);

  images.forEach((img, index) => {
    // currentSrc reflects the actual image being rendered (handles srcset/picture)
    const src = img.currentSrc || img.src;
    if (!src) return;

    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Extract filename from URL, strip query params
        const filename = img.alt + ".jpg";
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        console.log(`Downloaded: ${filename}`);
      })
      .catch((err) => console.error(`Failed to download image ${src}:`, err));
  });
})();
