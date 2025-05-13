



document.addEventListener("DOMContentLoaded", () => {
    const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "NZD", "CHF", "XAF"];
    const baseSelect = document.getElementById("baseCurrency");
    const targetSelect = document.getElementById("targetCurrency");
    const amountInput = document.getElementById("amount");
    const resultDiv = document.getElementById("result");

    // Populate currency dropdowns
    currencies.forEach(currency => {
        const option1 = new Option(currency, currency);
        const option2 = new Option(currency, currency);
        baseSelect.appendChild(option1.cloneNode(true));
        targetSelect.appendChild(option2.cloneNode(true));
    });

    document.getElementById("converterForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const base = baseSelect.value;
        const target = targetSelect.value;
        const amount = parseFloat(amountInput.value);

        if (!base || !target || isNaN(amount) || amount <= 0) {
            resultDiv.innerText = "Please enter valid inputs.";
            return;
        }

        const accessKey = "a7b37057fb7a3745bec69d6b13408141";
        const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${accessKey}&symbols=${target}&base=${base}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.rates && data.rates[target]) {
                    const rate = data.rates[target];
                    const converted = rate * amount;
                    resultDiv.innerText = `${amount} ${base} = ${converted.toFixed(2)} ${target}`;
                } else {
                    resultDiv.innerText = "Conversion failed: " + (data.error?.info || "Unknown error");
                }
            })
            .catch(error => {
                console.error("Error fetching conversion:", error);
                resultDiv.innerText = "Error fetching data.";
            });
    });
});
