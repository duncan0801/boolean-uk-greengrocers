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
function createEl(tag) {
  return document.createElement(tag)
}

const state = {
  items: [
    {
      "id": 001,
      "icon": String.raw`assets\icons\001-beetroot.svg`,
      "name": "beetroot",
      "price": 2,
      "in-basket?": false,
      "quantity": 0
    },
    {
      "id": 002,
      "icon": String.raw`assets\icons\002-carrot.svg`,
      "name": "carrot",
      "price": 1,
      "in-basket?": false,
      "quantity": 0
    },
    {
      "id": 003,
      "icon": String.raw`assets\icons\003-apple.svg`,
      "name": "apple",
      "price": 0.5,
      "in-basket?": false,
      "quantity": 0
    },
    {
      "id": 004,
      "icon": String.raw`assets\icons\004-apricot.svg`,
      "name": "apricot",
      "price": 0.5,
      "in-basket?": false,
      "quantity": 0
    },
    {
      "id": 005,
      "icon": String.raw`assets\icons\005-avocado.svg`,
      "name": "avacado",
      "price": 1,
      "in-basket?": false,
      "quantity": 0
    },
    {
      "id": 006,
      "icon": String.raw`assets\icons\006-bananas.svg`,
      "name": "bananas",
      "price": 2,
      "in-basket?": false,
      "quantity": 0
    },
    {
      "id": 007,
      "icon": String.raw`assets\icons\007-bell-pepper.svg`,
      "name": "bell pepper",
      "price": 1,
      "in-basket?": false,
      "quantity": 0
    },
    {
      "id": 008,
      "icon": String.raw`assets\icons\008-berry.svg`,
      "name": "berry",
      "price": 2,
      "in-basket?": false,
      "quantity": 0
    },
    {
      "id": 009,
      "icon": String.raw`assets\icons\009-blueberry.svg`,
      "name": "blueberry",
      "price": 1,
      "in-basket?": false,
      "quantity": 0
    }
  ] 
}
console.log(state)


function renderItemsToStore () {
  let shopList = document.querySelector("ul.store--item-list")

  for (const item of state.items) {
    let newLiEl = createEl("li")

    let storeIconDivEl = createEl("div")
    storeIconDivEl.setAttribute("class", "store--item-icon")

    let storeIconImgEl = createEl("img")
    storeIconImgEl.setAttribute("src", item.icon)
    storeIconImgEl.setAttribute("alt", item.name)

    let addToCartButtonEl = createEl("button")
    addToCartButtonEl.innerText = "Add To Cart"

    storeIconDivEl.append(storeIconImgEl)
    newLiEl.append(storeIconDivEl, addToCartButtonEl)
    shopList.append(newLiEl)

    // Click the button, change in state, render from page
    addToCartButtonEl.addEventListener("click", renderItemsToCart(item))

}
renderItemsToStore()

function renderItemsToCart(item) {
  if (item["in-basket?"]) {
    let cartItemListEl = document.querySelector(".cart--item-list")
  
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

    newCartLiEL.append(
      cartIconImgEl,
      nameEl,
      removeButton,
      quantityEl,
      addButton
      )
    cartItemListEl.append(newCartLiEL)

  }
}
