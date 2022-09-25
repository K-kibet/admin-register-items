
const form = document.querySelector('#items-form');
const listingItems = document.querySelector('.collection');
const buttonClear = document.querySelector('.clear-items');
const filter = document.querySelector('#filter');
const proName = document.querySelector('.inputbar-product');
const proDes = document.querySelector('.areabar-description');
const quantitiesitems = document.querySelector('.inputbar-quantity');
const itemsprices = document.querySelector('.inputbar-price');
const productint = [proName, proDes, quantitiesitems, itemsprices];


loadEventListeners();



function loadEventListeners() {

  document.addEventListener('DOMContentLoaded', getItems);

  form.addEventListener('submit', addItem);

  listingItems.addEventListener('click', deleteItem);

  buttonClear.addEventListener('click', clearItems);
 t
  filter.addEventListener('keyup', filterItems);
}


function getItems() {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function (item) {
 
    const div = document.createElement('div');
  
    div.className = 'collection-item';

    div.appendChild(document.createTextNode(item));


    const pDescription = document.createElement('p');
  
    pDescription.appendChild(document.createTextNode(proDes.value));


    const pqtt = document.createElement('p');
  
    pqtt.appendChild(document.createTextNode(quantitiesitems.value));

  
    const pPrice = document.createElement('p');
    
    pPrice.appendChild(document.createTextNode(itemsprices.value));


    const link = document.createElement('a');

    link.className = 'delete-item';

    link.innerHTML = '<i class="fa fa-remove"></i>';

   
    div.appendChild(pDescription);
    pDescription.appendChild(pqtt);
    pqtt.appendChild(pPrice);
    pPrice.appendChild(link);

   
    listingItems.appendChild(div);
  });
}

function addItem(e) {
  if (proName.value === '') {
    alert('Fill out the empty field');
  }


  const div = document.createElement('div');

  div.className = 'collection-item';

  div.appendChild(document.createTextNode(proName.value));


  const pDescription = document.createElement('p');

  pDescription.appendChild(document.createTextNode(proDes.value));


  const pqtt = document.createElement('p');

  pqtt.appendChild(document.createTextNode(quantitiesitems.value));

  
  const pPrice = document.createElement('p');

  pPrice.appendChild(document.createTextNode(itemsprices.value));


  const link = document.createElement('a');
  
  link.className = 'delete-item';

  link.innerHTML = '<i class="fa fa-remove"></i>';


  div.appendChild(pDescription);
  pDescription.appendChild(pqtt);
  pqtt.appendChild(pPrice);
  pPrice.appendChild(link);


  listingItems.appendChild(div);


  storeIteminLocalstorage(proName.value, proDes.value);

  //clear input
  proName.value = '';
  proDes.value = '';

  e.preventDefault();
}


function storeIteminLocalstorage(item1) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.push(item1);

  localStorage.setItem('items', JSON.stringify(items));
}


function deleteItem(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete?')) {
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

      // Remove from LS
      removeItemFromLocalStorage(
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement
      );
    }
  }
}


function removeItemFromLocalStorage(item) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function (item) {
    if (item.textContent == item) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}

function clearItems() {



  while (listingItems.firstChild) {
    listingItems.removeChild(itemsList.firstChild);
  }


  clearItemsFromLocalStorage();
}


function clearItemsFromLocalStorage() {
  localStorage.clear();
}


function filterItems(e) {
  const text = e.target.value.toLowerCase();

  document
    .querySelectorAll('.collection-item')
    .forEach(function (itemCollection) {
      const item = itemCollection.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
  
        itemCollection.style.display = 'block'; 
      } else {
        itemCollection.style.display = 'none'; 
      }
    });
}
