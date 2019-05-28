//selection***********************************************

const inputFilter = document.getElementById("inputFilter");

const productCollection = document.getElementById("product-collection");

const productName = document.getElementById("product-name");

const productPrice = document.getElementById("product-price");

const submit = document.getElementById("add-button");

const emtyPorduct = document.getElementById("emtyPorduct");
//***********************************************************

//data /state

let productData = [];

// create productData item

function getDate(productDatas) {
  if (productDatas.length > 0) {
    emtyPorduct.innerText = "";

    productDatas.forEach(product => {
      let li = document.createElement("li");
      li.className = "list-group-item d-flex";
      li.id = `product-${product.id}`;
      li.innerHTML = `
            
     </strong>${product.name}</strong>
     <span id="price">-$${product.price}</span>
     <span  class="ml-auto "  >
     <i class="fas fa-trash-alt" id="deletProduct"></i>
     </span>
            
            `;

      productCollection.appendChild(li);
    });
  } else {
    emtyPorduct.innerText = "no item to show ";
  }
}

getDate(productData);

submit.addEventListener("click", e => {
  e.preventDefault();

  let id;

  if (productData.length === 0) {
    id = 0;
  } else {
    id = productData[productData.length - 1].id + 1;
  }

  const name = productName.value;

  const price = productPrice.value;

  if (name === " " || price === "") {
    alert("please fill up necessary information");
  } else {
    productData.push({
      id,
      name,
      price
    });

    productCollection.innerHTML = " ";
    getDate(productData);

    productName.value = "";
    productPrice.value = "";
  }
});

//delete itme

productCollection.addEventListener("click", e => {
  if (e.target.id === "deletProduct") {
    // remove frome the ui
    const target = e.target.parentElement.parentElement;
    e.target.parentElement.parentElement.parentElement.removeChild(target);

    //remove frome the date
    //getting id

    const id = parseInt(target.id.split("-")[1]);

    //return result array
    const result = productData.filter(product => {
      return product.id !== id;
    });

    productData = result;
  }
});
