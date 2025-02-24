document.addEventListener("DOMContentLoaded", async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.url.includes("amazon.fr")) {
    document.getElementById("status").innerText =
      "❌ Ouvrez une page produit Amazon.";
    return;
  }

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: extractData,
    },
    (result) => {
      if (
        chrome.runtime.lastError ||
        !result ||
        !result[0] ||
        !result[0].result
      ) {
        document.getElementById("status").innerText =
          "❌ Impossible d'extraire les données.";
        return;
      }

      let { asin, offerId } = result[0].result;
      if (!asin || !offerId) {
        document.getElementById("status").innerText =
          "❌ ASIN ou Offer ID introuvables.";
        return;
      }

      document
        .getElementById("copy-asin")
        .addEventListener("click", function () {
          copyToClipboard(asin, "ASIN copié !");
        });

      document
        .getElementById("copy-offer-id")
        .addEventListener("click", function () {
          copyToClipboard(offerId, "Offer ID copié !");
        });

      document.getElementById("status").innerText = "✅ Données extraites.";
    }
  );
});

function extractData() {
  let asinElement = document.querySelector("#ASIN");
  let asin = asinElement ? asinElement.value : null;

  let offerElement =
    document.querySelector("#offerListingID") ||
    document.querySelector("input[name='items[0.base][offerListingId]']");
  let offerId = offerElement ? offerElement.value : null;

  return { asin, offerId };
}

function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    let status = document.getElementById("status");
    status.innerText = `✔ ${message}`;
    setTimeout(() => {
      status.innerText = "✅ Données extraites.";
    }, 1500);
  });
}
