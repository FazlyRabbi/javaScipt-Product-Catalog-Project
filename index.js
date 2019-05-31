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

  let productData = getDataFromLocalStorage();

  // localStorage product item

  function getDataFromLocalStorage() {
    let items = "";

    if (localStorage.getItem("productItme") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("productItme"));
    }

  

    return items;
  }

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

  //add item in localStorage

  function saveDateToLocalStorage(item) {
    let items = "";

    if (localStorage.getItem("productItme") === null) {
      items = [];
      items.push(item);
      localStorage.setItem("productItme", JSON.stringify(items));
    } else {
      items = JSON.parse(localStorage.getItem("productItme"));

      items.push(item);

      localStorage.setItem("productItme", JSON.stringify(items));
    }


  }

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
      const data = {
        id,
        name,
        price
      };

      productData.push(data);

      saveDateToLocalStorage(data);

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

        if (productItemName.indexOf(text) !== -1) {
          e.style.display = "block";

          massage("");
        } else if (productItemName.indexOf(text) === -1) {
          e.style.display = "none";

          massage("No item in your critaria");
        }
      });
  };

  //Delelete items frome locatStorage

  function deletDataFromeLocalStorage(id) {
    const items = JSON.parse(localStorage.getItem("productItme"));

    let result = items.filter(product => {
      return product.id !== id;
    });

    localStorage.setItem("productItme", JSON.stringify(result));

    if(result.length === 0) location.reload();
  }

  //Delete itme

  const DeleteItem = e => {
    if (e.target.id === "deletProduct") {
      // remove frome the ui
      const targets = e.target.parentElement;
      e.target.parentElement.parentElement.removeChild(targets);

      //remove frome the date
      //getting id
      const id = parseInt(targets.id.split("-")[1]);
      deletDataFromeLocalStorage(id);
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
