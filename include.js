function includeHeadHTML(callback) {
    const headElement = document.querySelector("head");
    const filePath = headElement.getAttribute("data-include");
    if (!filePath) {
      if (callback) {
        callback();
      }
      return;
    }
  
    fetch(filePath)
      .then((response) => response.text())
      .then((html) => {
        headElement.innerHTML += html;
        headElement.removeAttribute("data-include");
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        console.warn(`Error fetching ${filePath}: ${error}`);
      });
  }

function includeHTML(callback) {
    const elements = document.querySelectorAll("[data-include]");
    let remaining = elements.length;
  
    if (remaining === 0 && callback) {
      callback();
    }
  
    elements.forEach((element) => {
      const filePath = element.getAttribute("data-include");
      fetch(filePath)
        .then((response) => response.text())
        .then((html) => {
          element.innerHTML = html;
          element.removeAttribute("data-include");
          if (--remaining === 0 && callback) {
            callback();
          }
        })
        .catch((error) => {
          console.warn(`Error fetching ${filePath}: ${error}`);
        });
    });
  }