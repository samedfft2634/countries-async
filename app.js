const searchDiv = document.getElementById("searchDiv");
const searchInput = document.getElementById("search");
let countries = []

const getData = async () => {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        if(!response.ok){
            throw new Error(`Something went wrong:${res.status}`) 
        }
        const data = await response.json();
        countries = data
        showCountry(data[255])
    } catch (error) {
        console.log(error)
    }
	
};
window.addEventListener("load",getData);
searchInput.addEventListener("input",(e)=>{
    searchDiv.innerHTML = ""
    if(e.target.value){
        let filterCountry = countries.filter((item))
        
    }
})

const createEl = (span) => {
	let optionElement = `<span class="list border border-2 rounded-2 p-1" role="button">${span}</span>`;
    searchDiv.innerHTML += optionElement
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
        console.log(maps.googleMaps)
	;
};
