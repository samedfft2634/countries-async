const searchDiv = document.getElementById("searchDiv");
const searchInput = document.getElementById("search");

window.addEventListener("load",()=>{
    searchDiv.classList.add("visually-hidden")  
})

const getData = async () => {
	const response = await fetch(`https://restcountries.com/v3.1/all`);
	const data = await response.json();
	console.log(data);
	getCountryInfo(data);
    
};
getData();

const getCountryInfo = (data) => {
	data.forEach((x) => {
		const countryList = document.createElement("span");
		countryList.classList.add("list");
		searchDiv.appendChild(countryList);
		countryList.textContent = x.name.common;
	});
    
};

//Auto Complete Function
const getFilter = (e) => {
    searchDiv.classList.remove("visually-hidden")  
	const countryList = document.querySelectorAll(".list");
	let text = e.target.value;
	let pat = new RegExp(text, "i");
	countryList.forEach((country) => {
		if (pat.test(country.innerText)) {
			country.classList.remove("visually-hidden");
		} else {
			console.log(country);
			country.classList.add("visually-hidden");
		}
	});
};
searchInput.addEventListener("keyup",()=>{
    getFilter()
    showCountry(data);
});



// Show Country Informations On Card
const showCountry = (data) =>{
    data.forEach((countries)=>{
        const { flags, name,region, capital, languages,currencies,population, borders, maps} = countries
    })
}
