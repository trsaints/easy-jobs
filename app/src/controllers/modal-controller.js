export const modalController = {
  renderContent(job) {
    
  },

  closeModal() {
    const modal = document.querySelector("[data-element='modal']");

    const isVisible = modal.classList.contains("visible");

    if (isVisible) {
      modal.classList.remove("visible");
    }
  },

  exitModal(key) {
    if (key !== "Escape") {
      return;
    }

    const modal = document.querySelector("[data-element='modal']");

    const isVisible = modal.classList.contains("visible");

    if (isVisible) {
      modal.classList.remove("visible");
    }
  },

  openModal() {
    const modal = document.querySelector("[data-element='modal']");

    const isVisible = modal.classList.contains("visible");

    if (!isVisible) {
      modal.classList.add("visible");
    }
  },
};
