// Fetching URL
const url = "https://fakestoreapi.com/products";

// Array of data
let Dataset = [];
let tempData = [];

// getting html elements
let bodyEl = document.body;
let productDisplay = document.getElementById('products');
let category = document.getElementById('catogery');
let sortByPrice = document.getElementById('sortByPrice');
let mottoContainer = document.getElementById('mottoContainer');
let logo = document.getElementById('logo');

// fetching data
function fetchUrl(url){
  fetch(url)
    .then (response =>{
      if(!response.ok){
        console.log("Some error occured")
      }
      return response.json();
    })
    .then(data =>{
      Dataset = data;
      return Dataset;
    })
    
}
fetchUrl(url);

// function to display products
function displayItems(Dataset){
  tempData = Dataset;
  Dataset.forEach((element, index) => {
    let productName = document.createElement('p');
    productName.classList.add('productName');
    let productDescription = document.createElement('p');
    let productImg = document.createElement('img');
    productImg.classList.add('productImg');
    let productPrice = document.createElement('p');
    productImg.classList.add('productPrice');
    let productBuy = document.createElement('button');
    productBuy.classList.add('productBuy');

    let productDataDiv = document.createElement('div');
    productDataDiv.classList.add('productDataDiv');
    let productImgDiv = document.createElement('div');
    productImgDiv.classList.add('productImgDiv');
    let productAllData = document.createElement('div');
    productAllData.classList.add('productAllData')

    productName.textContent = element.title;
    productImg.src = element.image;
    productDescription.textContent = element.description;
    productPrice.textContent = `$${element.price}`;
    productBuy.innerHTML = 'Buy Now &#8594;';
    productDataDiv.appendChild(productName);
    productImgDiv.appendChild(productImg);
    productDataDiv.appendChild(productDescription);
    productDataDiv.appendChild(productPrice);
    productDataDiv.appendChild(productBuy);
    productAllData.appendChild(productDataDiv);
    productAllData.appendChild(productImgDiv);
    productDisplay.appendChild(productAllData);

    if (index % 2 === 0) {
      productImgDiv.classList.add('alignRight');
      productImgDiv.classList.remove('alignLeft');
    } else {
      productDataDiv.classList.add('alignLeft');
      productDataDiv.classList.remove('alignRight');
    }
  });
}

// Added a timeGap to display because of fetching time
setTimeout(()=>{
  displayItems(Dataset)
}, 1000);

// function to filter products by category
function filterProductsByCategory(category) {
  return Dataset.filter(product => product.category === category);
}

// on change of category dropbox display changes
category.addEventListener('change', ()=>{
  let val = category.value;

  if(val == `men's clothing`){
    productDisplay.innerHTML = '';
    mottoContainer.style.display = 'none';

    setTimeout(()=>{
      displayItems(filterProductsByCategory("men's clothing"));
    }, 1000);
  }
  else if(val == `women's clothing`){
    productDisplay.innerHTML = '';
    mottoContainer.style.display = 'none';
    displayItems(filterProductsByCategory("women's clothing"));
  }
  else if(val == `jewelry`){
    productDisplay.innerHTML = '';
    mottoContainer.style.display = 'none';
    displayItems(filterProductsByCategory("jewelery"));
  }
  else if(val == `electronics`){
    productDisplay.innerHTML = '';
    mottoContainer.style.display = 'none';
    displayItems(filterProductsByCategory("electronics"));
  }
  else{
    console.log("Error occured");
  }
})

// on change of sortByPrice display changes
sortByPrice.addEventListener('change', ()=>{
  let val = sortByPrice.value;

  if (val == 'ascending'){
    productDisplay.innerHTML = '';
    const sortedPrices = tempData.sort((a, b) => a.price - b.price);
    displayItems(sortedPrices);
    
  }
  else if(val == 'descending'){
    productDisplay.innerHTML = '';
    const sortedPrices = tempData.sort((a, b) => b.price - a.price);
    displayItems(sortedPrices);
  }
})

// on clicking logo webpage displays home
logo.addEventListener('click', ()=>{
  setTimeout(()=>{
    mottoContainer.style.display = 'flex';
    productDisplay.innerHTML = '';
    category.value = 'default';
    displayItems(Dataset)
  }, 1000);
})