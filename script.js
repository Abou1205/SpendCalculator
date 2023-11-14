// inputs, button, list div, info

const nameInput = document.querySelector("#name-input")
// console.log(nameInput);
const spendInput = document.querySelector("#spend-input")
// console.log(spendInput);
const priceInput = document.querySelector("#price-input")
// console.log(priceInput);
const addBtn = document.querySelector(".add-btn")
// console.log(addBtn);
const totalInfo = document.querySelector('#total-info')
// console.log(totalInfo);
const list = document.querySelector('.list')
// console.log(list);
const statusCheck = document.querySelector('#status-input')
// console.log(statusCheck);
const filter = document.querySelector('#filter-check')
// console.log(filter);

const userName = localStorage.getItem("name")

nameInput.value = userName

nameInput.addEventListener("change", (e)=>{
    // console.log(e.target.value);
    localStorage.setItem("name", e.target.value)
})

addBtn.addEventListener("click", addExpense)
list.addEventListener("click", handleClick)
filter.addEventListener("change", handleFilter)


let total = 0

function updateTotal(priceInfo) {
    total += Number(priceInfo)
    totalInfo.innerText = total
}

function addExpense(e) {
    e.preventDefault();
    // console.log("Hello");

    if(!spendInput.value || !priceInput.value){
        alert("Please fill all the gaps")
    } else{
        const spendDiv = document.createElement("div")
        spendDiv.classList.add("expense");

        if(statusCheck.checked){
            spendDiv.classList.add('paid');
        }

        spendDiv.innerHTML = `
        <h2>${spendInput.value}</h2>
        <h2 id="value">${priceInput.value}</h2>
        <div class="buttons">
            <img id="payment" src="images/pay.png" alt="">
            <img id="remove" src="images/remove.png" alt="">
        </div>
        `
        list.appendChild(spendDiv)
        
        updateTotal(priceInput.value)
    }


    
    spendInput.value= "";
    priceInput.value= "";
}

    function handleClick(e){
        let clickedElement = e.target
        const wrapperElement = clickedElement.parentElement.parentElement;
        const deletedPrice = wrapperElement.querySelector("#value").innerText;

        if(clickedElement.id === "remove"){
            updateTotal(-Number(deletedPrice))
            wrapperElement.remove()
        } else if(clickedElement.id === "payment"){
            wrapperElement.classList.add("paid");
        }
    }

function handleFilter(e) {
    // console.log('handlefilter');
    const spendCards = list.childNodes;
    // console.log(spendCards);
    const filterValue = e.target.value;
    // console.log(filterValue);

    spendCards.forEach((spendCard) => {
        // console.log(spendCard);

        switch(filterValue) {
            case 'all':
                spendCard.style.display ="flex";
                break;
            case 'paid':
                if(!spendCard.classList.contains('paid')){
                    spendCard.style.display ="none";
                } else {
                    spendCard.style.display ="flex";
                }
                break;
            case 'not-paid':
                if(spendCard.classList.contains('paid')){
                    spendCard.style.display = "none";
                } else {
                    spendCard.style.display = "flex";
                }
                break;
        }
    })

}