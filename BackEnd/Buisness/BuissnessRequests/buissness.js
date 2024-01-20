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
    //firebase config here

  };
  initializeApp(firebaseConfig);

const db = getFirestore(); 
const colBusinessRequests = collection(db,'BusinessRequests');

const form = document.querySelector('#registrationForm');

onSnapshot(colBusinessRequests,(snapshot)=>{
    const sortedReviews = [];
    snapshot.docs.forEach((doc)=>{
        sortedReviews.push({...doc.data(),id: doc.id})
    })
    console.log(sortedReviews);
})


// ///////////////////////////////////////////////////
document.getElementById('submitButton').addEventListener('click', function () {
  
  var form = document.getElementById('registrationForm');
  var fields = form.querySelectorAll('input[required], textarea[required], select[required], input[type="email"], input[type="url"], input[type="tel"], input[type="password"]');
  var isValid = true;
  var emailInput = document.getElementById('userEmail');
  var urlInput = document.getElementById('websiteURL');

  fields.forEach(function (field) {
      if (!field.value.trim()) {
        if (!emailInput.checkValidity()) {
            alert('Please enter a valid email address');
            return;
        } 
        if (!urlInput.checkValidity()) {
            alert('Please enter a valid website URL');
            return;
        }

          isValid = false;
       
          var errorMessage = document.getElementById('error-message');
          errorMessage.innerHTML = "<p>Please fill in all required fields.</p>";
          errorMessage.style.display = 'block';
          return;
      }
  });


  if (isValid) {
            form.style.display = 'none';
            var successMessage = document.getElementById('success-message');
            successMessage.innerHTML = "<p>Request submitted.</p><p>It usually takes 24-48 hours to get verified.</p>";
            successMessage.style.display = 'block';

            form.addEventListener('submit',(e)=>{
                e.preventDefault();
                addDoc(colBusinessRequests,{ 
                    BusinessName:form.businessName.value,
                    BusinessType:form.businessType.value,
                    BusinessStructure : form.businessStructure.value,
                    PhysicalAddress:form.physicalAddress.value,
                    MailingAddress:form.mailingAddress.value,
                    PhoneNumber:form.phoneNumber.value,
                    EmailAddress:form.emailAddress.value,
                    OwnersName:form.ownerName.value,
                    OwnerContactInformation:form.ownerContact.value,
                    ManagementPersonnel:form.managementPersonnel.value,
                    TaxID:form.taxID.value,
                    BusinessRN:form.registrationNumber.value,
                    Permits:form.licensesPermits.value,
                    BankAccIn:form.bankAccount.value,
                    BillingInfo:form.billingInformation.value,
                    Website:form.websiteURL.value,
                    SocialMedia:form.socialMedia.value,
                    Description:form.productDescription.value,
                    PricingInfo:form.pricingInformation.value,
                    CreateUserName:form.username.value,
                    CreatePass:form.password.value,
                    createdAt: serverTimestamp()
                })
                .then(()=>{
                    form.reset(); 
                })
                .catch((err)=>{
                    console.log("Error : ",err);
                })
            })
  }
});

      