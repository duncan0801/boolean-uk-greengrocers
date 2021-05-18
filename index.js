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
      "price": 2,
      "quantity": 0
    },
    {
      "id": "002-carrot",
      "name": "carrot",
      "price": 1,
      "quantity": 0
    },
    {
      "id": "003-apple",
      "name": "apple",
      "price": 0.5,
      "quantity": 0
    },
    {
      "id": "004-apricot",
      "name": "apricot",
      "price": 0.5,
      "quantity": 0
    },
    {
      "id": "005-avocado",
      "name": "avocado",
      "price": 1,
      "quantity": 0
    },
    {
      "id": "006-bananas",
      "name": "bananas",
      "price": 2,
      "quantity": 0
    },
    {
      "id": "007-bell-pepper",
      "name": "bell pepper",
      "price": 1,
      "quantity": 0
    },
    {
      "id": "008-berry",
      "name": "berry",
      "price": 2,
      "quantity": 0
    },
    {
      "id": "009-blueberry",
      "name": "blueberry",
      "price": 1,
      "quantity": 0
    }
  ],
  cart: []
}
function getImagPath(item) {
  return `./assets/icons/${item.id}.svg`
}
console.log(state)
function renderStoreItem(item) {
  let shopList = document.querySelector("ul.store--item-list")

  let newLiEl = createEl("li")

  let storeIconDivEl = createEl("div")
  storeIconDivEl.setAttribute("class", "store--item-icon")

  let storeIconImgEl = createEl("img")
  storeIconImgEl.setAttribute("src", getImagPath(item))
  storeIconImgEl.setAttribute("alt", item.name)

  let addToCartButtonEl = createEl("button")
  addToCartButtonEl.innerText = "Add To Cart"

  storeIconDivEl.append(storeIconImgEl)
  newLiEl.append(storeIconDivEl, addToCartButtonEl)
  shopList.append(newLiEl)

  // Click the button, change in state, render from page
  addToCartButtonEl.addEventListener("click", function () {
    ++item.quantity
    state.cart.push(item)
    renderItemToCart(item)
  })
}
function renderItemsToStore () {

  for (const item of state.products) {
    renderStoreItem(item)
  }
}
renderItemsToStore()
function calculateCartTotal() {
  //total = (quantity*price) of all items in cart
  const totalEl = document.querySelector(".total-number")
  let total = 0
  for (const item of state.cart) {
    total = total + item.quantity * item.price
    console.log(total)
    totalEl.innerText = `£${total}`
  }
}

function renderItemToCart(item) {

  let cartItemListEl = document.querySelector(".cart--item-list")
  console.log(cart)

  let newCartLiEL = createEl("li")

  let cartIconImgEl = createEl("img")
  cartIconImgEl.setAttribute("src", item.icon)
  
  cartIconImgEl.setAttribute("alt", item.name)

  let nameEl = createEl("p")
  nameEl.innerText = item.name

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
    calculateCartTotal()
    quantityEl.innerText = item.quantity
    if(item.quantity === 0) {
      newCartLiEL.remove()
      let itemIndex = state.cart.indexOf(item)
      console.log(itemIndex)
      console.log(state.cart)
      calculateCartTotal()
    }
  })
  addButton.addEventListener("click", function () {
    ++item.quantity
    quantityEl.innerText = item.quantity
    calculateCartTotal()
  })

}