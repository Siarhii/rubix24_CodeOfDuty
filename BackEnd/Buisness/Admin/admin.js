import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import {
    collection,
    getFirestore,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot, 
    query,
    where,
    orderBy,
    serverTimestamp ,
    getDocs, 
    updateDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
 
const firebaseConfig = {
   //your firebase config 
  };
  initializeApp(firebaseConfig);


  let businessData = [];
const db = getFirestore(); 
const colBusinessRequests = collection(db,'BusinessRequests');

onSnapshot(colBusinessRequests,(snapshot)=>{
    businessData = [];
    snapshot.docs.forEach((doc)=>{
        businessData.push({...doc.data(),id: doc.id})
    })
   
    setTimeout(()=>{
        generateBusinessRequests();
    },500)
})

function generateBusinessRequests() {
    var container = document.getElementById('businessRequests');
    let i = 0;
    businessData.forEach(function (business) {
        var requestContainer = document.createElement('div');
        requestContainer.className = 'request';
        requestContainer.id = i;
        i++;

        var detailsButton = document.createElement('button');
        detailsButton.className = 'btn-details';
        detailsButton.textContent = 'Details';
        requestContainer.appendChild(detailsButton);

        var header = document.createElement('div');
        header.innerHTML = '<strong>Business Name ' + business.BusinessName + '</strong>';
        requestContainer.appendChild(header);

        var detailsContainer = document.createElement('div');
        detailsContainer.className = 'business-details';
        detailsContainer.id = 'details' + business.id.slice(-1);

        var detailsContent = document.createElement('div');
        detailsContent.innerHTML = 
            '<p><strong>Business Name:</strong> ' + business.BusinessName + '</p>' +
            '<p><strong>Business Type:</strong> ' + business.BusinessType + '</p>' +
            '<p><strong>Business Structure:</strong> ' + business.BusinessStructure + '</p>' +
            '<p><strong>Physical Address:</strong> ' + business.PhysicalAddress + '</p>' +
            '<p><strong>Mailing Address:</strong> ' + business.MailingAddress + '</p>' +
            '<p><strong>Phone Number:</strong> ' + business.PhoneNumber + '</p>' +
            '<p><strong>Email Address:</strong> ' + business.EmailAddress + '</p>' +
            '<p><strong>Owner\'s Name:</strong> ' + business.OwnersName + '</p>' +
            '<p><strong>Owner Contact Information:</strong> ' + business.OwnerContactInformation + '</p>' +
            '<p><strong>Management Personnel:</strong> ' + business.ManagementPersonnel + '</p>' +
            '<p><strong>Tax ID:</strong> ' + business.TaxID + '</p>' +
            '<p><strong>Business Registration Number:</strong> ' + business.BusinessRN + '</p>' +
            '<p><strong>Permits/Licenses:</strong> ' + business.Permits + '</p>' +
            '<p><strong>Bank Account Information:</strong> ' + business.BankAccIn + '</p>' +
            '<p><strong>Billing Information:</strong> ' + business.BillingInfo + '</p>' +
            '<p><strong>Website URL:</strong> ' + business.Website + '</p>' +
            '<p><strong>Social Media:</strong> ' + business.SocialMedia + '</p>' +
            '<p><strong>Product Description:</strong> ' + business.Description + '</p>' +
            '<p><strong>Pricing Information:</strong> ' + business.PricingInfo + '</p>' +
            '<p><strong>Request send at:</strong> ' + formatDate(business.createdAt) + '</p>';


        
        console.log(business.createdAt);
        var buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'btn-container';

        var verifyButton = document.createElement('button');
        verifyButton.className = 'btn verify';
        verifyButton.textContent = 'Verify';
        buttonsContainer.appendChild(verifyButton);

        var rejectButton = document.createElement('button');
        rejectButton.className = 'btn reject';
        rejectButton.textContent = 'Reject';
        buttonsContainer.appendChild(rejectButton);

        detailsContainer.appendChild(detailsContent);
        detailsContainer.appendChild(buttonsContainer);

        requestContainer.appendChild(detailsContainer);

        container.appendChild(requestContainer);

        // Add event listeners
        detailsButton.addEventListener('click', function () {
            toggleDetails(business.id);
        });

        verifyButton.addEventListener('click', function () {
            handleAction('verify', business.id, requestContainer);

            
        });

        rejectButton.addEventListener('click', function () {
            handleAction('reject', business.id, requestContainer);
        });
    });
}

function formatDate(timestamp) {
    const date = timestamp.toDate();
    const options = { month: 'short', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options);

    return `${dateString} ${date.toLocaleTimeString('en-US')}`;
}


function toggleDetails(detailsId) {
    var details = document.getElementById('details' + detailsId.slice(-1));
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
}

function handleAction(action, requestId, requestContainer) {
    var actionText = action === 'verify' ? 'verified' : 'rejected';

    if (action === 'reject') {
        requestContainer.classList.add('rejected');
        requestContainer.querySelector('.business-details').innerHTML = '<p><strong>Request Status:</strong> Rejected</p>';
    } else if (action === 'verify') {
        requestContainer.classList.add('verified');
        requestContainer.querySelector('.business-details').innerHTML = '<p><strong>Request Status:</strong> Verified</p>';
    }

    alert('Request ' + requestId + ' ' + actionText + '!');
   
}

