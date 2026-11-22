let selectedEmojis = [];

const picker = document.getElementById("picker");

picker.addEventListener("emoji-click", function(event) {
    const emoji = event.detail.unicode;

    // Duplicate emoji ko dobara add nahi karna
    if (!selectedEmojis.includes(emoji)) {
        selectedEmojis.push(emoji);
    }

    updateEmojis();
});

function updateEmojis() {
    const container = document.getElementById("selectedEmojis");

    container.innerHTML = "";

    if (selectedEmojis.length === 0) {
        container.innerHTML =
            '<span class="empty-text">No emojis selected yet ✨</span>';
        return;
    }

    selectedEmojis.forEach((emoji, index) => {
        const chip = document.createElement("div");
        chip.className = "emoji-chip";

        const emojiSpan = document.createElement("span");
        emojiSpan.textContent = emoji;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.className = "remove-emoji";
        removeBtn.type = "button";
        removeBtn.setAttribute("aria-label", "Remove emoji");

        removeBtn.addEventListener("click", function() {
            selectedEmojis.splice(index, 1);
            updateEmojis();
        });

        chip.appendChild(emojiSpan);
        chip.appendChild(removeBtn);

        container.appendChild(chip);
    });
}

// Clear all emojis
document.getElementById("clearEmojis").addEventListener("click", function() {
    selectedEmojis = [];
    updateEmojis();
});

function generateText() {
    const message = document.getElementById("message").value;
    const mode = document.getElementById("mode").value;

    let output = "";

    if (message.trim() === "") {
        alert("Please write a message!");
        return;
    }

    if (selectedEmojis.length === 0) {
        alert("Please select at least one emoji!");
        return;
    }

    if (mode === "character") {
        for (let i = 1; i <= message.length; i++) {
            let emoji = selectedEmojis[(i - 1) % selectedEmojis.length];

            output += message.substring(0, i) + " " + emoji + "\n";
        }
    }

    if (mode === "word") {
        let words = message.trim().split(/\s+/);

        for (let i = 1; i <= words.length; i++) {
            let emoji = selectedEmojis[(i - 1) % selectedEmojis.length];

            output += words.slice(0, i).join(" ") + " " + emoji + "\n";
        }
    }

    document.getElementById("output").innerText = output;
}

function copyText() {
    const text = document.getElementById("output").innerText;

    if (!text.trim()) {
        alert("Generate text first!");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => alert("Copied successfully! 💗"))
        .catch(() => alert("Copy failed. Try using HTTPS."));
}

// Initial display
updateEmojis();