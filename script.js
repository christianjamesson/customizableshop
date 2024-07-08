let cart = [];

function addToCart(productName, price, quantity) {
    const existingItem = cart.find(item => item.productName === productName);
    
    if (existingItem) {
        alert("You can't add more than one of each item.");
        return;
    }
    
    const item = {
        productName,
        price,
        quantity: parseInt(quantity)
    };
    cart.push(item);
    displayCart();
}

function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <p>${item.productName} - $${item.price} x ${item.quantity}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function placeOrder() {
    const name = document.getElementById('name').value;
    const note = document.getElementById('note').value;

    if (!name) {
        alert('Please enter your name');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const orderDetails = cart.map(item => {
        return `Product: ${item.productName}, Price: $${item.price}, Quantity: ${item.quantity}, Total: $${item.price * item.quantity}`;
    }).join('\n');

    const webhookURL = "YOUR_DISCORD_WEBHOOK_URL"; // Replace with your Discord webhook URL

    const payload = {
        content: `New Order:\nName: ${name}\nNote: ${note}\n\n${orderDetails}`
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert("Order placed successfully!");
            cart = [];
            displayCart();
        } else {
            alert("Failed to place order.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while placing the order.");
    });
}
