const uploadBtn = document.getElementById('uploadBtn');
const modal = document.getElementById('uploadModal');
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');

if (uploadBtn) {
  uploadBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append('video', file);
  fetch('/upload', { method: 'POST', body: formData })
    .then(() => window.location.reload());
}

if (dropArea) {
  dropArea.addEventListener('click', () => fileInput.click());
  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('hover');
  });
  dropArea.addEventListener('dragleave', () => dropArea.classList.remove('hover'));
  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('hover');
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  });
}

if (fileInput) {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) uploadFile(file);
  });
}
