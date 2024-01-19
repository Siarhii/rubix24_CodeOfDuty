function showRouteAndFare() {
    const fromStation = document.getElementById('FromStation').value;
    const toStation = document.getElementById('ToStation').value;
  
    if (fromStation && toStation) {
      // Handle showing route and fare logic
      const message = `Showing Route and Fare from ${fromStation} to ${toStation}`;
      console.log(message);
      alert(message);
    } else {
      alert('Please select both From and To stations.');
    }
  }
  
  /* Add more JavaScript logic as needed */
  