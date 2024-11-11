document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("download-form");
  const urlInput = document.getElementById("url-input");
  const resultDiv = document.getElementById("result");
  const contactTrigger = document.getElementById("contact-trigger");
  const contactModal = document.getElementById("contact-modal");
  const closeModal = document.querySelector(".close");
  const contactForm = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const url = urlInput.value;

      try {
        const response = await fetch(`/ytdl?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.success) {
          const { title, description, channel, duration, formats, thumbnails } =
            data.data;
          const bestThumbnail = thumbnails[thumbnails.length - 1];

          const base64Thumbnail = await fetchImageAsBase64(bestThumbnail.url);

          let videoFormats = formats.filter(
            (f) => f.vcodec && f.vcodec !== "none"
          );
          let audioFormats = formats.filter(
            (f) =>
              f.acodec &&
              f.acodec !== "none" &&
              (!f.vcodec || f.vcodec === "none")
          );

          resultDiv.innerHTML = `
                        <div class="result-content">
                            <img src="${base64Thumbnail}" alt="Thumbnail" class="thumbnail">
                            <h3>${title}</h3>
                            <p>Channel: ${channel}</p>
                            <p>Duration: ${formatDuration(duration)}</p>
                            <p>Description: ${description}</p>
                            <div class="download-options">
                                <div class="format-section">
                                    <h4>Video Formats</h4>
                                    ${videoFormats
                                      .map((format) =>
                                        createFormatItem(format, title, "video")
                                      )
                                      .join("")}
                                </div>
                                <div class="format-section">
                                    <h4>Audio Formats</h4>
                                    ${audioFormats
                                      .map((format) =>
                                        createFormatItem(format, title, "audio")
                                      )
                                      .join("")}
                                </div>
                            </div>
                        </div>
                    `;

          // Add event listeners for play buttons
          document.querySelectorAll(".play-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
              const url = e.target.dataset.url;
              const type = e.target.dataset.type;
              const player = document.createElement(type);
              player.src = url;
              player.controls = true;
              player.autoplay = true;
              e.target.parentNode.appendChild(player);
              e.target.remove();
            });
          });
        } else {
          resultDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
        }
      } catch (error) {
        resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    });
  }

  if (contactTrigger && contactModal && closeModal) {
    contactTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      contactModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
      contactModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        contactModal.style.display = "none";
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Here you would typically send the form data to your server
      alert("Message sent! (This is a demo)");
      contactModal.style.display = "none";
    });
  }
});

async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(`/proxy?url=${encodeURIComponent(url)}`);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function formatFileSize(bytes) {
  if (!bytes) return "Unknown";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function createFormatItem(format, title, type) {
  const hasAudio = format.acodec && format.acodec !== "none";
  const muteIcon = !hasAudio
    ? '<span class="mute-icon" title="No audio">🔇</span>'
    : "";

  return `
        <div class="download-item">
            <h5>${type === "video" ? `${format.height}p` : "Audio"} (${
    format.ext
  }) ${muteIcon}</h5>
            <p>Format: ${format.ext}</p>
            <p>Size: ${formatFileSize(format.filesize_approx)}</p>
            ${
              type === "video"
                ? `<p>Quality: ${format.height}p</p>`
                : `<p>Bitrate: ${format.abr}kbps</p>`
            }
            <button class="play-btn" data-url="${
              format.url
            }" data-type="${type}">Play</button>
            <a href="${format.url}" download="${title}.${
    format.ext
  }" class="download-btn">Download</a>
        </div>
    `;
}
