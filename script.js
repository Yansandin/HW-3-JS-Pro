document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function addReview() {
    const productName = document.getElementById('product-name').value;
    const productReview = document.getElementById('product-review').value;

    if (!productName || !productReview) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (!reviews[productName]) {
        reviews[productName] = [];
    }
    reviews[productName].push(productReview);

    localStorage.setItem('reviews', JSON.stringify(reviews));

    document.getElementById('product-name').value = '';
    document.getElementById('product-review').value = '';

    loadProducts();
}

function loadProducts() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    for (const product in reviews) {
        const li = document.createElement('li');
        li.textContent = product;
        li.style.cursor = 'pointer';
        li.onclick = () => showReviews(product);
        productsList.appendChild(li);
    }
}

function showReviews(product) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const productReviews = document.getElementById('product-reviews');
    productReviews.innerHTML = `<h3>Отзывы о ${product}</h3>`;

    reviews[product].forEach((review, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.textContent = review;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = () => deleteReview(product, index);

        reviewItem.appendChild(deleteButton);
        productReviews.appendChild(reviewItem);
    });
}

function deleteReview(product, index) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    reviews[product].splice(index, 1);

    if (reviews[product].length === 0) {
        delete reviews[product];
    }

    localStorage.setItem('reviews', JSON.stringify(reviews));
    showReviews(product);
    loadProducts();
}


