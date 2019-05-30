window.onload = function() {
  //selection***********************************************

  const inputFilter = document.getElementById("inputFilter");

  const productCollection = document.getElementById("product-collection");

  const productName = document.getElementById("product-name");

  const productPrice = document.getElementById("product-price");

  const submit = document.getElementById("add-button");

  const massages = document.getElementById("emtyPorduct");

  //***********************************************************

  //data /state

  let productData = [];

  // create massege funciton

  function massage(showMassage) {
    massages.innerHTML = showMassage;
  }

  // create productData item

  function getDate(productDatas) {
    if (productDatas.length > 0) {
      massages.innerText = "";

      //travarce the array elemets
      productDatas.forEach(({ id, name, price }) => {
        let li = document.createElement("li");
        li.className = "list-group-item  collection-item";
        li.id = `product-${id}`;
        li.innerHTML = `<strong>${name}</strong><span id="price">-$${price}</span><i class="fas fa-trash-alt float-right" id="deletProduct"></i>`;

        productCollection.appendChild(li);
      });
    } else {
      massage("please add some item");
    }
  }

  //call the getData function

  getDate(productData);

  // add  item

  const addItem = e => {
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
  };

  //Searching product

  const Searching = () => {
    const text = event.target.value.toLowerCase();

    document
      .querySelectorAll("#product-collection .collection-item")
      .forEach(e => {
        const productItemName = e.firstElementChild.textContent.toLowerCase();

        if (productItemName.indexOf(text) === -1) {
          massage("No item in your critaria");
          e.style.display = "none";
        } else {
          massage("");
          e.style.display = "block";
        }
      });
  };

  //Delete itme

  const DeleteItem = e => {
    if (e.target.id === "deletProduct") {
      // remove frome the ui
      const targets = e.target.parentElement;
      e.target.parentElement.parentElement.removeChild(targets);

      //remove frome the date
      //getting id
      const id = parseInt(targets.id.split("-")[1]);

      //return result array
      const result = productData.filter(product => {
        return product.id !== id;
      });

      productData = result;
    }
  };

  //Event listenar call with funciton

  //add item
  submit.addEventListener("click", addItem);

  //searching product
  inputFilter.addEventListener("keyup", Searching);

  //delet item
  productCollection.addEventListener("click", DeleteItem);
};
