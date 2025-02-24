// content.js
function addCopyButtons() {
  const buyNowDiv = document.getElementById("buyNow_feature_div");
  if (!buyNowDiv) return;

  const productDiv = document.querySelector(
    "div[data-asin][data-encoded-offering]"
  );
  if (!productDiv) return;

  const asin = productDiv.getAttribute("data-asin");
  const offerId = productDiv.getAttribute("data-encoded-offering");

  const buttonStack = document.createElement("div");
  buttonStack.className = "a-button-stack";
  buttonStack.style.marginTop = "10px";

  function createStyledButton(text, value) {
    const buttonSpan = document.createElement("span");
    buttonSpan.className =
      "a-button a-spacing-small a-button-primary a-button-icon";
    buttonSpan.style.backgroundColor = "#0073e6";
    buttonSpan.style.borderColor = "#0073e6";

    const buttonInner = document.createElement("span");
    buttonInner.className = "a-button-inner";

    const buttonInput = document.createElement("input");
    buttonInput.type = "button";
    buttonInput.className = "a-button-input";
    buttonInput.value = text;
    buttonInput.style.backgroundColor = "#0073e6";
    buttonInput.style.borderColor = "#0073e6";
    buttonInput.style.color = "white";
    buttonInput.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      navigator.clipboard.writeText(value).then(() => {
        buttonText.textContent = "✔ Copié !";
        setTimeout(() => {
          buttonText.textContent = text;
        }, 1500);
      });
    };

    const buttonText = document.createElement("span");
    buttonText.className = "a-button-text";
    buttonText.textContent = text;
    buttonText.style.color = "black";

    buttonInner.appendChild(buttonInput);
    buttonInner.appendChild(buttonText);
    buttonSpan.appendChild(buttonInner);

    return buttonSpan;
  }

  buttonStack.appendChild(createStyledButton("Copier l'ASIN", asin));
  buttonStack.appendChild(createStyledButton("Copier l'Offer ID", offerId));

  buyNowDiv.appendChild(buttonStack);
}

addCopyButtons();
