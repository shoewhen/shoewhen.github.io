const imageViewer = document.createElement("dialog");
imageViewer.className = "image-viewer";
imageViewer.setAttribute("aria-label", "Full-size project image");

const viewerClose = document.createElement("button");
viewerClose.className = "image-viewer-close";
viewerClose.type = "button";
viewerClose.setAttribute("aria-label", "Close full-size image");
viewerClose.textContent = "×";

const viewerImage = document.createElement("img");
viewerImage.className = "image-viewer-image";

const viewerCaption = document.createElement("p");
viewerCaption.className = "image-viewer-caption";

imageViewer.append(viewerClose, viewerImage, viewerCaption);
document.body.append(imageViewer);

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const trigger = event.target.closest("a[data-lightbox]");
  if (!trigger) return;

  const thumbnail = trigger.querySelector("img");
  const imageSource = trigger.dataset.fullImage || trigger.href;
  if (!imageSource) return;

  event.preventDefault();
  viewerImage.src = imageSource;
  viewerImage.alt = trigger.dataset.imageAlt || thumbnail?.alt || "";
  viewerCaption.textContent = trigger.dataset.caption || thumbnail?.alt || "";
  viewerCaption.hidden = !viewerCaption.textContent;
  imageViewer.showModal();
  viewerClose.focus();
});

viewerClose.addEventListener("click", () => imageViewer.close());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageViewer.open) imageViewer.close();
});
imageViewer.addEventListener("click", (event) => {
  if (event.target === imageViewer) imageViewer.close();
});
imageViewer.addEventListener("close", () => {
  viewerImage.removeAttribute("src");
  viewerImage.alt = "";
});