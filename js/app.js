/* const loadPhones = () =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}
loadPhones(); */

const loadPhones = async (searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    // console.log(phones);
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText= '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10); 
       
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }
    

    // disply no phone found

    const noPhone = document.getElementById('error-msg');
    if(phones.length ===0){
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top p-4" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop loader 
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
      // start loader
      toggleSpinner(true);
      const searchField = document.getElementById('search-field');
      const searchText = searchField.value;
      loadPhones(searchText, dataLimit);
  
}

document.getElementById('btn-search').addEventListener('click', function(){
  processSearch(10);
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none');
    }
}

// not the best way to load show all data 
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

// loadPhones();