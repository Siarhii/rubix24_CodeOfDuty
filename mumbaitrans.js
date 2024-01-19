const mumbaiTrains = [
    { route: 'Western Line', schedule: '6:00 AM - 11:00 PM', fare: 'Rs. 10 - Rs. 50' },
    { route: 'Central Line', schedule: '5:30 AM - 10:30 PM', fare: 'Rs. 10 - Rs. 60' },
    { route: 'Harbor Line', schedule: '6:15 AM - 10:45 PM', fare: 'Rs. 10 - Rs. 40' },
    // Add more train services as needed
  ];
  
  const mumbaiBuses = [
    { route: 'Dadar to Borivali', schedule: '1:00 PM - 3:00 PM', fare: 'Rs. 20' },
    { route: 'Malad to Kandivali', schedule: '5:15 PM - 6:45 PM', fare: 'Rs. 20' },
    { route: 'Shivaji Park to Bandra', schedule: '4:15 PM - 5:10 PM', fare: 'Rs. 10' },
    { route: 'Mulund to Thane', schedule: '5:20 PM - 6:45 PM', fare: 'Rs. 20' },
    { route: 'Sion to Kings Circle', schedule: '5:50 PM - 6:00 PM', fare: 'Rs. 20' },
    // Add more bus services as needed
  ];
  
  function showTrainDetails() {
    displayServiceDetails('Train Services', mumbaiTrains);
  }
  
  function showBusDetails() {
    displayServiceDetails('Bus Services', mumbaiBuses);
  }
  
  function displayServiceDetails(serviceTitle, serviceData) {
    document.getElementById('service-details').innerHTML = '';
    const tableBody = document.getElementById('service-details');
  
    serviceData.forEach(service => {
      const row = tableBody.insertRow();
      const cellRoute = row.insertCell(0);
      const cellSchedule = row.insertCell(1);
      const cellFare = row.insertCell(2);
  
      cellRoute.textContent = service.route;
      cellSchedule.textContent = service.schedule;
      cellFare.textContent = service.fare;
    });
  
    document.getElementById('service-title').textContent = serviceTitle;
    document.getElementById('details-container').style.display = 'block';
  }
  
  function hideDetails() {
    document.getElementById('details-container').style.display = 'none';
  }