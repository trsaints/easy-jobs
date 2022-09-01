export const elementController = {
  generateElement(elem, elemClass) {
    const currElement = document.createElement(elem);
    currElement.classList.add(elemClass);

    return currElement;
  },

  clearContent(target) {
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
  },
};
