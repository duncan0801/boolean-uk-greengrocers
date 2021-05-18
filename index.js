/*
Deliverables
- A user can view a selection of items in the store
- From the store, a user can add an item to their cart
- From the cart, a user can view and adjust the number of items in their cart
- If an item's quantity equals zero it is removed from the cart
- A user can view the current total in their cart

Instructions
- Use this template as a starting point => https://codesandbox.io/s/js-exercise-greengrocer-template-grqi6
- Create a state object
- Create action functions that update state
- Create render functions that read from state

Tips
- Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
- Taking HTML semantics into consideration, use a button when an action is happening on the same page

Challenge
Create a json-server, and make your app persist the data 

Challenge 2
- Add filters to the store ie. filter by item type; when a user clicks a filter they will only see items of that type
- Add sorting to the store ie. sort by price or sort alphabetically; when a user clicks sort they will see a sorted list of items

This is how an item object should look like

{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }

*/

/*
1. create a state variable with the details of:
    a.id
    b.icon
    c.name
    d.price
    e.In--basket?
    f.Quantitiy
2. Render items to the shop section
3. Create a funciton that will render all items with the in-basket = true
4. create event listeners on the add to cart buttons that will render the item to the cart
*/
let totalEl = document.querySelector(".total-number")
let total = 0
function createEl(tag) {
  return document.createElement(tag)
}

//TODO Take away the icon key
const state = {
  products: [
    {
      "id": "001-beetroot",
      "name": "beetroot",
      "price": 0.35,
    },
    {
      "id": "002-carrot",
      "name": "carrot",
      "price": 0.50,
    },
    {
      "id": "003-apple",
      "name": "apple",
      "price": 1.25,
    },
    {
      "id": "004-apricot",
      "name": "apricot",
      "price": 0.65,
    },
    {
      "id": "005-avocado",
      "name": "avocado",
      "price": 1.00,
    },
    {
      "id": "006-bananas",
      "name": "bananas",
      "price": 2.00,
    },
    {
      "id": "007-bell-pepper",
      "name": "bell pepper",
      "price": 0.45,
    },
    {
      "id": "008-berry",
      "name": "berry",
      "price": 0.35,
    },
    {
      "id": "009-blueberry",
      "name": "blueberry",
      "price": 0.90,
    }
  ],
  cart: [

  ]
}
function getImagPath(item) {
  return `./assets/icons/${item.id}.svg`
}

function renderStoreItem(storeItem) {
  let shopList = document.querySelector("ul.store--item-list")

  let newLiEl = createEl("li")

  let storeIconDivEl = createEl("div")
  storeIconDivEl.setAttribute("class", "store--item-icon")

  let storeIconImgEl = createEl("img")
  storeIconImgEl.setAttribute("src", getImagPath(storeItem))
  storeIconImgEl.setAttribute("alt", storeItem.name)

  let addToCartButtonEl = createEl("button")
  addToCartButtonEl.innerText = "Add To Cart"

  storeIconDivEl.append(storeIconImgEl)
  newLiEl.append(storeIconDivEl, addToCartButtonEl)
  shopList.append(newLiEl)

  // When clicking the add to cart button:
  //  - ✔Check if the item is already in the cart 
  //  - ✔the item should be added to the cart with an ID and a quantity of 1
  //  -✔ (different action) the item should be increased by one every time it is pressed after
  // if the item quantity === 0, remove the item from the cart
  addToCartButtonEl.addEventListener("click", function () {
   
    let product = state.cart.find(function (possibleCartItem) {
      return possibleCartItem.id === storeItem.id
       
    })
    if (!product) {
      let newCartItem = {
        "id": storeItem.id,
        "quantity": 1
      }
      state.cart.push(newCartItem)
      calculateTotalCost()
      renderAllCartItems()
  
    }
    else if (product) {
      ++product.quantity
      calculateTotalCost()
      renderAllCartItems()
    }
  })
}

function renderItemsToStore () {

  for (const item of state.products) {
    renderStoreItem(item)
  }
}
renderItemsToStore()

function renderItemToCart(item) {

  let product = state.products.find(function(product) {
    return item.id === product.id
  })
  console.log("item:", item)
  console.log("product",product)

  let cartItemListEl = document.querySelector(".cart--item-list")

  let newCartLiEL = createEl("li")

  let cartIconImgEl = createEl("img")
  cartIconImgEl.setAttribute("src", getImagPath(item))
  cartIconImgEl.setAttribute("alt", product.name)

  let nameEl = createEl("p")
  nameEl.innerText = product.name

  let removeButton = createEl("button")
  removeButton.setAttribute("class", "quantity-btn remove-btn center")

  let quantityEl = createEl("span")
  quantityEl.innerText = item.quantity

  let addButton = createEl("button")
  addButton.setAttribute("class", "quantity-btn add-btn center")

  newCartLiEL.append(cartIconImgEl, nameEl, removeButton, quantityEl, addButton)
  cartItemListEl.append(newCartLiEL)

  removeButton.addEventListener("click", function () {
    --item.quantity
    quantityEl.innerText = item.quantity
    calculateTotalCost ()
    if(item.quantity === 0) {
      newCartLiEL.remove()
      calculateTotalCost ()
    }
  })
  addButton.addEventListener("click", function () {
    ++item.quantity
    quantityEl.innerText = item.quantity
    calculateTotalCost ()
  })
  return cartItemListEl
}
let cartEl = document.querySelector(".cart--item-list")

function renderAllCartItems (newCartData) {
  cartEl.innerHTML = ""

  for (item of state.cart) {
    renderItemToCart(item)
  }
}

function calculateTotalCost () {
  //1. Go through current cart and get quantity of each item 
  //2. refer to state.products to get price 
  //3. total = total + quantity*price
  //4. Add the total to the total span in the document
  let totalEl = document.querySelector(".total-number")

  let total = 0
  for (item of state.cart) {
    let productToGetPriceFrom = state.products.find(function (product) {
      return item.id === product.id
    })
    total += productToGetPriceFrom.price * item.quantity
  }

  totalEl.innerText = `£${total.toFixed(2)}`

  console.log("HERE")
}