const $ = document;

let ulElem = $.querySelector(".items");
let cartItemsElem = $.querySelector(".cartItems");
let pageContainerElem = $.querySelector(".pageContainer");
let searchInputElem = $.querySelector("#searchInput");
let searchedItemsElem = $.querySelector("#searchedItems");
let fragmentItems = $.createDocumentFragment();

let cartArry = [];
let searchedImages = [];
let sum = 0;
let currentPage = 1;
let perPage = 6;

let imgs = [
  {
    id: 1,
    img: "imgs/1.jpg",
    name: "عکس شماره 1",
    alt: "1.jpg",
    price: 75,
    count: 1,
  },
  {
    id: 2,
    img: "imgs/3.jpg",
    name: "عکس شماره 2",
    alt: "3.jpg",
    price: 15,
    count: 1,
  },
  {
    id: 3,
    img: "imgs/bg.jpg",
    name: "عکس شماره 3",
    alt: "bg.jpg",
    price: 92,
    count: 1,
  },
  {
    id: 4,
    img: "imgs/city.jpg",
    name: "عکس شماره 4",
    alt: "city.jpg",
    price: 50,
    count: 1,
  },
  {
    id: 5,
    img: "imgs/free.jpg",
    name: "عکس شماره 5",
    alt: "free.jpg",
    price: 64,
    count: 1,
  },
  {
    id: 6,
    img: "imgs/Header_Background.jpg",
    name: "عکس شماره 6",
    alt: "Header_Background.jpg",
    price: 33,
    count: 1,
  },
  {
    id: 7,
    img: "imgs/image1.jpg",
    name: "عکس شماره 7",
    alt: "image1.jpg",
    price: 90,
    count: 1,
  },
  {
    id: 8,
    img: "imgs/image2.jpg",
    name: "عکس شماره 8",
    alt: "image2.jpg",
    price: 60,
    count: 1,
  },
  {
    id: 9,
    img: "imgs/image3.jpg",
    name: "عکس شماره 9",
    alt: "image3.jpg",
    price: 20,
    count: 1,
  },
  {
    id: 10,
    img: "imgs/modal-background.png",
    name: "عکس شماره 10",
    alt: "modal-background.png",
    price: 40,
    count: 1,
  },
  {
    id: 11,
    img: "imgs/page-bg.jpg",
    name: "عکس شماره 11",
    alt: "page-bg.jpg",
    price: 100,
    count: 1,
  },
  {
    id: 12,
    img: "imgs/peakpx.jpg",
    name: "عکس شماره 12",
    alt: "peakpx.jpg",
    price: 70,
    count: 1,
  },
  {
    id: 13,
    img: "imgs/sky.jpg",
    name: "عکس شماره 13",
    alt: "sky.jpg",
    price: 30,
    count: 1,
  },
  {
    id: 14,
    img: "imgs/slides-1.jpg",
    name: "عکس شماره 14",
    alt: "slides-1.jpg",
    price: 1,
    count: 1,
  },
];

// * first load items
function itemsHandler() {
  // console.log("started");
  paginationHandler(imgs, currentPage, perPage, pageContainerElem);
}

// * add any item to cart
function addToCartHandler(itemID) {
  // * find item by id
  let findItem = imgs.find((item) => {
    return item.id === itemID;
  });

  // * check item if added to cart before
  // * push to cart
  let itemExistInCart = cartArry.some((item) => {
    return item.id === itemID;
  });
  if (itemExistInCart) {
    // findItem.count += 1;
    alert("قبلا به سبد خرید اضافه شده است!");
  } else {
    cartArry.push({ ...findItem });
  }
  // console.log(cartArry);
  // ? add items to div cart
  cartHandler();
}

// * add items to div cart
function cartHandler() {
  sum = 0;

  // * delete childs in pushing new item to cart
  cartItemsElem.innerHTML = "";

  // * show h2 tag when cart is empty
  cartArry.length === 0 &&
    cartItemsElem.insertAdjacentHTML("afterbegin", ` <h2>سبد خرید</h2> `);

  // * items subject
  cartArry.length > 0 &&
    cartItemsElem.insertAdjacentHTML(
      "afterbegin",
      `
        <h2>سبد خرید</h2>
        <div class="cartItem">
          <h3>حذف</h3>
          <h3>عکس</h3>
          <h3>قیمت</h3>
          <h3>تعداد</h3>
        </div>
        `
    );

  // * add cart array items
  cartArry.length > 0 &&
    cartArry.forEach((item) => {
      cartItemsElem.insertAdjacentHTML(
        "beforeend",
        `
        <div class="cartItem">
          <button class="itemRemoveFromCart" 
                  onclick="removeItemFromCart(${item.id})">❌</button>
          <div class="itemPic_Name">
            <img class="itemPic" src=${item.img} alt=${item.alt} />
            <span class="itemName">${item.name}</span>
          </div>
          <span class="itemPrice">$${item.price}</span>
          <input
            class="itemCount"
            type="number"
            placeholder="تعداد"
            min="1"
            value=${item.count}
            oninput="itemCountHandler(event, ${item.id})"
          />
        </div>
      `
      );

      // * calculate price
      sum += item.price;
    });

  // * cart price calculate
  cartPriceCalculate(sum);
}

// * cart price calculate
function cartPriceCalculate(price) {
  price !== 0 &&
    cartItemsElem.insertAdjacentHTML(
      "beforeend",
      `
        <div class="cartPrice">
          <h3>مبلغ کل :</h3>
          <p>$${price}</p>
        </div>
        `
    );
}

// * item count calculate
function itemCountHandler(event, itemID) {
  let count = parseInt(event.target.value, 10);
  if (count < 1) {
    alert("تعداد باید حداقل ۱ باشد.");
    event.target.value = 1;
    return;
  }

  let getItem = cartArry.find((item) => item.id === itemID);
  let originalItem = imgs.find((item) => item.id === itemID);
  getItem.count = count;
  getItem.price = originalItem.price * count;

  cartHandler();
}

// * remove item from cart
function removeItemFromCart(itemID) {
  let findIndex = cartArry.findIndex((item) => {
    return item.id === itemID;
  });
  // console.log(findIndex);
  cartArry.splice(findIndex, 1);
  // console.log(cartArry);

  // reGenerate Cart div
  cartHandler();
}

//  * pagination
function paginationHandler(arr, current_page, per_Page, pageContainer) {
  let endSlice = current_page * per_Page;
  let startSlice = endSlice - per_Page;
  // console.log("startSlice is: " + startSlice + " endSlice is: " + endSlice);

  let sliceImgs = arr.slice(startSlice, endSlice);
  // console.log(sliceImgs);

  // * set new slice data
  ulElem.innerHTML = "";
  sliceImgs.forEach((item) => {
    ulElem.insertAdjacentHTML(
      "beforeend",
      `
        <li id=${item.id} class="item">
          <div class="card">
            <div class="card-body">
              <img class="itemPic" src=${item.img} alt=${item.alt} />
            </div>
            <div class="card-footer">
              <div class="itemInfo">
              <h2 class="itemName">${item.name}</h2>
              <p class="itemPrice">$${item.price}</p>
              </div>
              <button class="btnAddToCart" onclick="addToCartHandler(${item.id})">
                <span>اضافه به سبد خرید</span>
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-cart-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"
                    />
                    <path
                      d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
                    />
                  </svg>
                </i>
              </button>
            </div>
          </div>
        </li>
        `
    );
  });

  paginationBtns(arr, current_page, per_Page, pageContainer);
}

// * create btn of pagination
function paginationBtns(arr, current_page, per_Page, pageContainer) {
  // * prevent btn's clone
  pageContainer.innerHTML = "";

  let newBtn = Math.ceil(arr.length / per_Page);
  for (let i = 0; i < newBtn; i++) {
    pageContainer.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <button class="${
          current_page - 1 === i ? "btnPaginate active" : "btnPaginate"
        }" onclick="updatePaginationHandler(${i + 1})">${i + 1}</button>
      </li>
      `
    );
  }
}

// * update data with clicking to btn of paginate
function updatePaginationHandler(current_page) {
  console.log(current_page);
  currentPage = current_page;
  console.log(currentPage);

  itemsHandler();
}

// * search handle
function searchHandle() {
  if (searchInputElem.value !== "") {
    searchedItemsElem.style.display = "flex";

    let searchedImage = searchInputElem.value.toLowerCase();
    // console.log(searchedImage);
    let findImage = imgs.filter((imgName) => {
      return imgName.name.toLowerCase().includes(searchedImage);
    });
    // console.log(findImage);

    searchedItemsElem.innerHTML = "";
    findImage.forEach((img) => {
      searchedItemsElem.insertAdjacentHTML(
        "beforeend",
        `
        <li class="cartItems" onclick="searchedItemsClickHandle('${img.id}')">
                <div class="cartItem">
                  <div class="itemPic_Name">
                    <img class="itemPic" src=${img.img} alt=${img.name} />
                    <span class="itemName">${img.name}</span>
                  </div>
                </div>
              </li>
              `
      );
    });
  } else {
    searchedItemsElem.style.display = "none";
  }
}
searchInputElem.addEventListener("input", searchHandle);
function searchedItemsClickHandle(itemID) {
  // console.log(typeof itemID);

  let imgClicked = imgs.filter((item) => {
    return item.id === +itemID;
  });

  cartArry.push({ ...imgClicked[0] });
  cartHandler();

  // console.log(imgClicked);
  // searchInputElem.value = imgClicked[0].name;
  searchInputElem.value = "";
  searchedItemsElem.style.display = "none";
}

// * load data onLoad site
$.body.addEventListener("load", itemsHandler());
