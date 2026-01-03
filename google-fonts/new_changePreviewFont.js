// SIMPLIFIED changePreviewFont function
function changePreviewFont(fontName, fontCategory) {
    const previewTextElement = document.getElementById('preview-text');
    if (previewTextElement) {
        // SIMPLIFIED APPROACH: Always preserve font size
        
        // Store font selection
        previewTextElement.dataset.currentFont = fontName;
        previewTextElement.dataset.currentFontCategory = fontCategory;

        // Get size array for this font category
        currentSizeArray = previewFontSizes[fontCategory] || previewFontSizes['default'];

        // Set font family
        previewTextElement.style.fontFamily = `'${fontName}', ${getFallbackFont(fontCategory)}`;
        
        // PRESERVE CURRENT SIZE - This is the key!
        if (currentSizeIndex >= 0 && currentSizeIndex < currentSizeArray.length) {
            // Use current size if valid
            previewTextElement.style.fontSize = currentSizeArray[currentSizeIndex] + 'px';
        } else {
            // First selection or invalid index - use reasonable default
            currentSizeIndex = Math.min(1, currentSizeArray.length - 1); // 18px or first available
            previewTextElement.style.fontSize = currentSizeArray[currentSizeIndex] + 'px';
        }
        
        // Update state
        previewTextElement.style.fontWeight = 'normal';
        currentFontSize = currentSizeArray[currentSizeIndex];

        // Visual indicator
        previewTextElement.classList.add('using-card-font');

        // Show notification
        showFontSelectionNotification(fontName);
    }
}