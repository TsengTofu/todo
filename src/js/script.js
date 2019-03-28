let AddBtn = document.querySelector(".addBtn");
let addListLi = document.querySelector(".todoList");
let outWrapper = document.querySelector(".list_show");

AddBtn.addEventListener("click", function () {
  let newListUl = document.createElement("ul");
  let newList = document.createElement("li");
  newList.className = "to_do_list_li";

  let inputValue = addListLi.value;
  newList.innerHTML = `${inputValue}`;

  let closeBtn = document.createElement("a");
  closeBtn.className = "delete";
  closeBtn.innerHTML = `<i class="fas fa-minus"></i>`;



  console.log(addListLi.value);
  // 這邊有抓到input的value
  newList.appendChild(closeBtn);
  newListUl.appendChild(newList);
  outWrapper.appendChild(newListUl);
  closeBtn.addEventListener("click", function () {
    outWrapper.removeChild(this.parentNode.parentNode);
    // 因為少寫父層     
  });
});