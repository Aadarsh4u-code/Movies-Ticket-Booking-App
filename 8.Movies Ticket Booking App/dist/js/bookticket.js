const movieSelect = document.getElementById('movie');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
let ticketPrice = +movieSelect.value; //parseInt() or + both changes string into number

populateUI();
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));//retriving index of selected seats
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));//storing in selected seats in localstorage

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
//wrting a function for setting movieIndex and price in LS
function setMoviesData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice',moviePrice);
}

//populateUI by fetching data form localstorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    }); 
  }
  
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null && selectedMovieIndex.length > 0) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Selecting different movies eventListener
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMoviesData(e.target.selectedIndex, e.target.value);//calling a function to get movies index and price
  updateSelectedCount();
});


//Selecting seat for movie eventListener
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

//initial count and total cost
updateSelectedCount();
