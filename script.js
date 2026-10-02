const form = document.getElementById("guestbook-form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const messagesContainer = document.getElementById("guestbook-messages");

// Load saved messages
let messages = JSON.parse(localStorage.getItem("guestbookMessages")) || [];


// Save messages
function saveMessages() {
    localStorage.setItem("guestbookMessages", JSON.stringify(messages));
}


// Display messages
function displayMessages() {

    messagesContainer.innerHTML = "";

    messages.forEach(function (item, index) {

        const messageBox = document.createElement("div");

        messageBox.className =
            "bg-white p-5 rounded-xl border border-gray-200 shadow-sm";

        messageBox.innerHTML = `
            <h3 class="font-semibold text-lg">${item.name}</h3>

            <p class="text-gray-600 mt-2">
                ${item.message}
            </p>

            <button class="delete-btn mt-4 text-sm text-red-500 hover:text-red-700">
                Delete
            </button>
        `;

        const deleteButton = messageBox.querySelector(".delete-btn");

        deleteButton.addEventListener("click", function () {

            messages.splice(index, 1);

            saveMessages();

            displayMessages();
        });

        messagesContainer.appendChild(messageBox);
    });
}


// Submit form
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value;
    const message = messageInput.value;

    messages.push({
        name: name,
        message: message
    });

    saveMessages();

    displayMessages();

    nameInput.value = "";
    messageInput.value = "";
});


// Show saved messages when page loads
displayMessages();