const searchDiv = document.getElementById("searchDiv");
const searchInput = document.getElementById("search");
const countryCard = document.querySelector(".countries");
let countries = []

const getData = async () => {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        if(!response.ok){
            throw new Error(`Something went wrong: ${response.status}`) 
        }
        const data = await response.json();
        countries = data
		const turkey = countries.find(item => item.name.common === "Turkey");
        if (turkey) {
            showCountry(turkey);
            searchInput.value = turkey.name.common;
        }
    } catch (error) {
        console.log(error)
    }
	
};
window.addEventListener("load",getData);
searchInput.addEventListener("input",(e)=>{
    searchDiv.innerHTML = ""
    if(e.target.value){
        let filterCountry = countries.filter((item)=> item.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
		if(filterCountry.length == 1){
			showCountry(filterCountry[0]) 
		} else {
			filterCountry.forEach((item)=> createEl(item.name.common) )
		}
    } 
	
})

const createEl = (span) => {
	let optionElement = document.createElement("span");
    optionElement.className = 'list border border-1 rounded-1 p-4" role="button" bg-white';
    optionElement.textContent = span;
	searchDiv.appendChild(optionElement)
	optionElement.addEventListener("click",()=>{
		const selectedCountry = countries.find(item => item.name.common === span)
		if(selectedCountry){
			searchInput.value =  selectedCountry.name.common
			searchDiv.innerHTML = ""
			searchDiv.classList.add("visually-hidden");
			showCountry(selectedCountry);
		}
	})
};

//Auto Complete Function
const getFilter = (e) => {
	searchDiv.classList.remove("visually-hidden");
	const countryList = document.querySelectorAll(".list");
	let text = e.target.value;
	let pat = new RegExp(text, "i");
	countryList.forEach((country) => {
		if (pat.test(country.innerText)) {
			country.classList.remove("visually-hidden");
		} else {
			// console.log(country);
			country.classList.add("visually-hidden");
		}
	});
	// console.log(pat);
	return pat;
};
searchInput.addEventListener("keyup", getFilter);

// Show Country Informations On Card
const showCountry = (country) => {
		const {
			name: {common},
			capital,
			region,
			flags: {svg},
			languages,
			currencies,
			population,
			borders,
			maps,
		} = country;
       countryCard.innerHTML = `
		  <div class="card shadow-lg" style="width: 22rem">
            <img src="${svg}" class="card-img-top shadow" alt="#" />
            <div >
              <h5 class="p-2 text-center">${common}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${region}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-landmark"></i>
                <span class="fw-bold"> Capitals:</span> ${capital}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-comments"></i>
                <span class="fw-bold"> Languages:</span> ${Object.values(languages)}
              </li>
              <li class="list-group-item">
                <i class="fas fa-lg fa-money-bill-wave"></i>
                <span class="fw-bold"> Currencies:</span> 
				${Object.values(currencies)[0].name},
				${Object.values(currencies)[0].symbol}
              </li>
              <li class="list-group-item">
              <i class="fa-solid fa-people-group"></i></i>
              <span class="fw-bold"> Population:</span> ${population}
            </li>
              <li class="list-group-item">
              <i class="fa-sharp fa-solid fa-road-barrier"></i>
              <span class="fw-bold"> Borders:</span>  ${borders || "None"}
            </li>
            </li>
            <li class="list-group-item">
              <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href="${maps.googleMaps} " target='_blank'> Go to google map</a>
			  </li>
            </ul>
          </div>
	   `

	;
};
