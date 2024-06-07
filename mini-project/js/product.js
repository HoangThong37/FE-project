var urlGetData = "http://10.63.161.172:3000/api/get-product";
var urlOrder = "http://10.63.161.172:3000/api/get-order";
var urlSubmitOrder = "http://10.63.161.172:3000/api/insert-order";

var totalItems = [];
var listImageCurrent = [];

var cart = JSON.parse(localStorage.getItem("cart") || "[]");

var cartSubmit = [];

var timer = 0;
var pageCount = 0;
var listItems = 0;
var currentPage = 0;
var size = 9;

var body = {
  page: currentPage,
  data: {
    type: "service",
  },
};

var currentProduct = null;
var pagination = document.getElementById("pagination");
var paginationNumbers = document.getElementById("pagination-numbers");
var listImageElement = document.getElementById("list-image");
var quantityElement = document.getElementById("quantity");
var cartTableBody = document.querySelector("#cart-table tbody");
var totalPriceElement = document.getElementById("total-price");

var successContainer = document.getElementById("success-container");
var successItem = document.getElementById("success-item");
var cartPopup = document.getElementById("cart-popup");

var searchInput = document.getElementById("search");
var btnService = document.getElementById("button_service");
var btnFacility = document.getElementById("button_facilities");

var cartDetail = document.getElementById("cart-detail");
var cartDetailContainer = document.getElementById("cart-detail-container");
var popupCartDetail = document.getElementById("popup-cart-detail");

function addToCart() {
  const index = cart.findIndex((item) => item.id == currentProduct.id);
  if (index != -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...currentProduct, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  quantityElement.textContent = cart.reduce(
    (res, curr) => (res += curr.quantity),
    0
  );
  closePopup();
}

function showCartPopup() {
  cartDetailContainer.classList.remove("hidden");
  cartDetailContainer.classList.add("show");

  cartPopup.classList.remove("hidden");
  cartPopup.classList.add("show");

  popupCartDetail.classList.add("show");

  renderCartTable();
}

function removeFromCart(index) {
  const indexFound = cart.findIndex((item) => item.id == index);

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart = cart.filter((item, ind) => ind != index);
  }

  quantityElement.innerHTML = cart.reduce(
    (res, curr) => (res += curr.quantity),
    0
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartTable();
}

function renderCartTable() {
  cartTableBody.innerHTML = "";

  let totalPrice = cart.reduce(
    (res, curr) => (res += curr.quantity * curr.price),
    0
  );

  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
      const item = cart[key];

      const row = document.createElement("tr");
      const nameCell = document.createElement("td"); // name
      const priceCell = document.createElement("td"); // price
      const quantityCell = document.createElement("td"); // quantity

      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button"); // delete

      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      priceCell.textContent = `${(
        item.price * item.quantity
      ).toLocaleString()} VND`;

      row.appendChild(priceCell);

      quantityCell.textContent = item.quantity;
      row.appendChild(quantityCell);

      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => removeFromCart(key);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      cartTableBody.appendChild(row);
    }
  }

  totalPriceElement.textContent = `${totalPrice.toLocaleString()} VND`;
}

function closeCartPopup() {
  cartPopup.classList.add("hidden");
  cartPopup.classList.remove("show");

  popupCartDetail.classList.add("hidden");
  popupCartDetail.classList.remove("show");
}

// handle request fail.
async function fetchRetry(url, options) {
  let startRetries = 0;
  let maxRetries = 5;
  let retryDelay = 2000;

  while (startRetries < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return (await response.json()).data;
      } else {
        throw new Error(
          `API request failed with status code ${response.status}`
        );
      }
    } catch (error) {
      console.error(`Error fetching data from API: ${error.message}`);
      startRetries++;

      if (startRetries === maxRetries) {
        alert("Request API get data fail");
        throw error;
      } else {
        console.log(`Retrying API request (${startRetries} of ${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
}

// get data.
const getData = async (body) => {
  try {
    const { items, total } = await fetchRetry(urlGetData, {
      method: "POST",
      body: JSON.stringify(body),
    });

    return { items, total, status: true };
  } catch (error) {
    return { items: [], total: 0, status: false };
  }
};

const renderView = async (body) => {
  const { items, total, status } = await getData({ ...body, size }); // spread (...)

  listImageCurrent = items;

  totalItems = total;

  const value = localStorage.getItem("cart");
  const data1 = JSON.parse(value) || [];

  listImageElement.innerHTML = items
    .map(
      (item) => `
       <div class="item" style="border: 1px solid black;" onclick="showPopup(${JSON.stringify(
         item
       ).replace(/"/g, "&quot;")})">
        ${showProducs(item)}
        </div>
    `
    )
    .join("");

  const totalPage = Math.ceil(totalItems / size); // 50/9

  paginationNumbers.innerHTML = [...Array(totalPage).keys()]
    .map(
      (x) => `<div onclick="handlePage(${x})" 
      class = "item-page ${x == currentPage ? "item-page-active" : ""}">
      ${x + 1}
      </div>`
    )
    .join("");

  quantityElement.textContent = cart.reduce(
    (res, curr) => (res += curr.quantity),
    0
  );
};

const handlePage = (pageClick) => {
  currentPage = pageClick;
  renderView({ ...body, page: currentPage }); // set new body when click page.
};

const prePage = () => {
  if (currentPage == 0) return;
  handlePage(currentPage - 1);
};

const nextPage = () => {
  if (currentPage == Math.ceil(totalItems / size)) return;
  handlePage(currentPage + 1);
};

// show products.
function showProducs(item) {
  return `
      <img src="${item.image}" style="width: 100%;">
      <h4 style="padding-left: 5px;">${item.name}</h4>
      <p style="padding-left: 5px;">Price: ${item.price.toLocaleString()} VND</p>
    `;
}

// show popup when clicked on img
function showPopup(item) {
  currentProduct = item;

  const popup = document.getElementById("popup");
  const popupImage = popup.querySelector(".popup-image");
  const popupName = popup.querySelector(".popup-name");
  const popupDescription = popup.querySelector(".popup-description");
  const popupPrice = popup.querySelector(".popup-price");

  popupImage.src = item.image;
  popupName.textContent = item.name;
  popupDescription.textContent = item.description;
  popupPrice.textContent = `${item.price.toLocaleString()} VND`;

  popup.style.display = "block";
}

window.addEventListener("click", (e) => {
  const detailPopup = document.getElementById("popup-cart-detail");
  if (e.target == detailPopup) {
    popupCartDetail.classList.add("hidden");
    popupCartDetail.classList.remove("show");
  }
});

const clickClosePopup = (event) => {
  closePopup();
};

// close the popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

// filter data and update when click button.
const filterData = (productType) => {
  body.data.type = productType;
  renderView(body);
};

const handleClickBtn = (typeBtn) => {
  if (body.data.type == typeBtn) return;
  body.data.type = typeBtn;

  switch (typeBtn) {
    case "service":
      btnService.classList.add("active");
      btnFacility.classList.remove("active");
      break;
    case "facility":
      btnFacility.classList.add("active");
      btnService.classList.remove("active");
      break;
    default:
      break;
  }

  renderView(body);
};

// search data.
searchInput.addEventListener("input", function (event) {
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    console.log("time : ", timer);
    body.data.name = event.target.value;
    renderView(body);
  }, 300);
});

// submit order
const submitOrder = async () => {
  try {
    const callApi = await fetch(urlSubmitOrder, {
      method: "POST",
      body: JSON.stringify({ items: [{ products: [...cart] }] }),
    });

    const response = await callApi.json();

    console.log("res : ", response.items);

    // localStorage.setItem("cart", );
    // JSON.stringify(data)
    // read:
    // const dataJSON = localStorage.getItem('myData');
    // Chuyển đổi dữ liệu từ chuỗi JSON về đối tượng JavaScript
    // const data = JSON.parse(dataJSON);

    const showText = ` 
    <div class="flex" style="flex: 1; flex-direction: column;">
      <div style="width: 100%; text-align: right">
        <span onclick="closeShowSucess()" style="cursor: pointer; padding:10px">X</span>
      </div> 
      <div id="detail-content" style="display: flex; width:100%; flex: 1;flex-direction: column; justify-content: center; align-items: center; gap:10px;"
        <p>Create order successfully</p>
        <p>Check order detail <a style="color:#38c6f4" href='/html/order.html?orderId=${response.items[0].orderId}'>here</a> </p>
      </div>
    </div>
  `;

    successItem.innerHTML = showText;
    successContainer.classList.add("show-flex");

    cart = [];
    cartSubmit = [];

    quantityElement.textContent = 0;

    cartDetailContainer.classList.remove("show");
    cartDetailContainer.classList.add("hidden");

    closeCartPopup();
  } catch (error) {
    throw new error();
  }
};

const closeShowSucess = () => {
  successContainer.classList.remove("show-flex");
  successContainer.classList.add("hidden");
};

const clickOnSuccess = (event) => {
  if (event.target.id == successContainer.id) {
    successContainer.classList.remove("show-flex");
    successContainer.classList.add("hidden");
    return;
  }
};

const handleClickCartDetailContainer = (event) => {
  if (event.target.id == cartDetailContainer.id) {
    cartDetailContainer.classList.remove("show");
    cartDetailContainer.classList.add("hidden");
    return;
  }
};

renderView(body);
