const searchButton = document.getElementById('searchBtn');
const MealItemsDiv = document.getElementById('MealItemsDiv');
const detailsMeal = document.getElementById("detailsMeal");

// Event listener for search Button
searchButton.addEventListener('click', () => {
    let searchInputText = document.getElementById('searchInput').value;
     if(searchInputText == ""){
        alert("Please input a word");
        return ;
    }
  
    document.getElementById('searchInput').value = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`)
        .then(response => response.json())
        .then(data => getMealItems(data))
        .catch(error => console.log(error))
});

// Hide detailsDiv===========//
const detailsHide = () => {
     document.getElementById("mealCard").style.display = "none";
}


const getMealItems = (mealItems) => {
    let mealItemsHTML = "";
    if (mealItems.meals) {
        mealItems.meals.forEach(meal => {
            mealItemsHTML += `
           <div class="col-md-3 mb-4">
           <a href="#detailsMeal">
             <div onclick="showDetails('${meal.strMeal}')" class="card bg-light mealItem shadow">
                <img src="${meal.strMealThumb}" class="img-fluid" alt="meal">
                <div class="card-body">
                    <h5 class="text-center getDetails">${meal.strMeal}</h5>
                </div>
              </div>
           </div>
           </a>
            `;
        });
        MealItemsDiv.classList.remove('noResult'); 
        
    } else {
        mealItemsHTML = `
       <h3>No results, try again with a new Word...!!</h3>
      `  ;
      MealItemsDiv.classList.add('noResult');   
    }
    MealItemsDiv.innerHTML = mealItemsHTML;
}


const showDetails = (mealData) => {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealData}`)
    .then(response => response.json())
    .then(data => getDetailsMeal(data.meals[0]))
    ;
}


const getDetailsMeal = mealDetails => {
    detailsMeal.innerHTML = `
    <div id="mealCard" class="card" style="width: 35rem;">
      <img src="${mealDetails.strMealThumb}" alt="Meal">
      <div class="card-body" id="mealCardIN">
          <h2 class="card-title py-2">${mealDetails.strMeal}</h2>
          <h5 class="pb-3">Ingredients</h5> 

      </div>
      </div>
      `;
const value = Object.values(mealDetails);
console.log(value);
for(let i = 9; i < 20; i++){
    if(value[i] === null || value[i] === " "){
        break;
    }
    else{
    const card = document.getElementById("mealCardIN");
    const p = document.createElement("p");
    p.innerText = "↪ " + value[i];
    card.appendChild(p);
    }
 }

}

