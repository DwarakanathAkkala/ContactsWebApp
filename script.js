let container = document.createElement("div");
container.setAttribute("class", "container");
container.innerHTML = `
    <h1 id="title" class="text-center">Contacts Web App</h1>
    <p id="description" class="text-center">Enter details in the fields below, then press the "Submit" button to create the contact to your address book.</p>
    
    <div class="card">
        <div class="card-body">
            <form id="createContactForm" class="mb-4 row" novalidate>
                <h1 class="form-header">Create Contact</h1>
                <div class="mb-3 row">
                    <div class="col-md-12 form-group">
                        <label for="name" class="mb-2">Name</label>
                        <input id="name" class="form-control" name="name" type="text" required placeholder="Enter Name" required>
                        <div class="invalid-feedback">Please Enter Valid Name</div>
                    </div>

                    
                </div>

                <div class="mb-3 row">
                    <div class="col-md-12 form-group">
                        <label for="number" class="mb-2 form-check-label">Contact Number</label>
                        <input id="number" class="form-control" name="number" type="number" placeholder="Enter Contact Number" required>
                        <div class="invalid-feedback">Please Enter Valid Contact Number</div>
                    </div>
                </div>

                </div>

                <div class="d-grid gap-2 mb-3 d-md-flex justify-content-md-center">
                    <button class="btn btn-primary" id="resetBtn" type="reset" onclick=reset()>Reset</button>
                    <button class="btn btn-primary" id="submit" type="button" onclick="submitForm()">Submit</button>
                </div>

            </form>  
        </div>
    </div>

    <h1>Contacts Data</h1>
    <h6 id="tableDescription">Please submit an entry to get the table data.</h6>
    <div class="table-responsive-lg" id="tableContainer">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody id="contactEntries">

            </tbody>
        </table>
    </div>

    <!--Invalid Toast-->
    <div class="toast-container position-fixed top-50 end-0" style="z-index: 11">
      <div id="invalidToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Oops :-(</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-danger text-white">
          Please fill the required fields.
        </div>
      </div>
    </div>


    <!--Valid Toast-->
    <div class="toast-container position-fixed top-50 end-0" style="z-index: 11">
      <div id="validToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Hurray :-)</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-success text-white">
          Contact Saved Successfully :-)
        </div>
      </div>
    </div>

    <!--Delete Alert Toast-->
    <div class="toast-container position-fixed top-50 start-50 translate-middle" style="z-index: 11">
      <div id="deleteToastAlert" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">This will delete your valuable contact :-)</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="d-grid gap-2 mb-3 d-md-flex mt-2 justify-content-md-center">
            <button class="btn btn-warning" id="deleteBtn" type="reset" onclick="deleteContact(number)" data-bs-dismiss="toast">Delete</button>
            <button type="btn btn-primary" id="closeBtn" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
        </div>
      </div>
    </div>


    <!--Contact Successful Delete Toast-->
    <div class="toast-container position-fixed top-50 start-50 translate-middle" >
      <div id="deleteToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Contact deleted Successfully</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-success text-white">
          You have lost a friend :-(
        </div>
      </div>
    </div>

    <!--Duplicate Contact Toast-->
    <div class="toast-container position-fixed top-50 start-50 translate-middle">
      <div id="duplicateContactToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Oops... Duplicate Contact</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-success text-white">
          Please check the contacts
        </div>
      </div>
    </div>

    <!-- Edit Contact Modal -->
    <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">Edit Contact</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="editContactForm" class="row" novalidate>
              <div class="row">
                <div class="col-md-12 form-group">
                  <label for="name" class="mb-2">Name</label>
                  <input id="editConFormName" class="form-control" name="name" type="text" required placeholder="Enter Name" required>
                  <div class="invalid-feedback">Please Enter Valid Name</div>
                </div>
              </div>

              <div class="mb-4 row">
                  <div class="col-md-12 form-group">
                      <label for="number" class="mb-2 form-check-label">Contact Number</label>
                      <input id="editConFormNumber" class="form-control" name="number" type="number" placeholder="Enter Contact Number" required>
                      <div class="invalid-feedback">Please Enter Valid Contact Number</div>
                  </div>
              </div>

            </form>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onClick="editContact()" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
`;


// Add Created DOM to HTML
document.body.append(container);

let contactEntries = document.getElementById("contactEntries");

window.onload = () => {
  document.getElementById("tableContainer").style.display = "block";
  getAirTableData();
};

let allContacts = [];
let idToBeUpdated;

// Target Form Element
const contactForm = document.getElementById("createContactForm");

function submitForm() {
  // Activate Bootstrap Validations
  contactForm.classList.add("was-validated");

  // Create Bootstrap Toast Trigger
  let invalidElement = document.getElementById("invalidToast");
  let invalidToast = new bootstrap.Toast(invalidElement, {
    delay: 1000
  });

  // Get Contact Form Input Data    
  const formData = new FormData(contactForm);
  const formDataObj = Object.fromEntries(formData.entries());

  // Check for invalid form Values
  if (!contactForm.checkValidity()) {
    invalidToast.show(); // Activate Invalid Toast (Error Message)
    return;
  }

  // Success Scenario
  else {
    document.getElementById("tableContainer").style.display = "block";

    // Check for Duplicate Contacts
    duplicateContactCheck(formDataObj);

    if (duplicateContactCheck(formDataObj) == false) {

      addData(formDataObj);

      let validElement = document.getElementById("validToast");
      let validToast = new bootstrap.Toast(validElement, {
        delay: 1000
      });
      validToast.show(); // Activate Valid Toast (Success Message)
      contactForm.reset(); // Reset Form
      contactForm.classList.remove("was-validated"); // Remove Bootstrap Validation CSS
      // document.getElementById("tableContainer").scrollIntoView(); // Move to Table
    }
  }
};


// Function for adding Contact Form Data to Table
async function addData(dataObj) {
  // window.localStorage.setItem(dataObj.number, dataObj.name);  // Save Contact in Local Storage
  allContacts.push(dataObj); // Update object

  await fetch('https://api.airtable.com/v0/appPLZ9OcsUMRfOMr/Contacts', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer patswudjUsPEvI1SM.b67ac3c95d7ee8a96dcb153d0eba4d07e38ec07511fe4650cf2c96f560f3193d',
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      "records": [{
        "fields": {
          "Name": dataObj.name,
          "Number": dataObj.number
        }
      }]
    }
    )
  })

  contactEntries.innerHTML = ``; // Reset Table DOM
  // loadTable(allContacts); // Display Data with updated values
  getAirTableData();

};

// Load Table
function loadTable(data) {
  for (let i = 0; i < data.length; i++) {
    contactEntries.innerHTML += `
    <tr>
      <td>${data[i].name}</td>
      <td>${data[i].number}</td>
      <td><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="updateDataID('${data[i].id}', '${data[i].name}', '${data[i].number}')">
        <i class="fa fa-pencil-square" aria-hidden="true"></i>
      </button> &nbsp; &nbsp;
      <button class="btn" id="deleteBtn" onClick="deleteContactAlert('${data[i].id}')"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
    </tr>`;
  }
}

function updateDataID(id, name, number) {
  console.log("To be edited Index value", id);
  idToBeUpdated = id;
  document.getElementById('editConFormName').value = name;
  document.getElementById('editConFormNumber').value = number;
}

async function editContact() {

  // Target Form Element
  const editContactForm = document.getElementById("editContactForm");

  // Activate Bootstrap Validations
  editContactForm.classList.add("was-validated");

  // Get Contact Form Input Data    
  const editContactFormData = new FormData(editContactForm);
  const editContactFormDataObj = Object.fromEntries(editContactFormData.entries());
  editContactFormDataObj.id = idToBeUpdated;
  // Create Bootstrap Toast Trigger
  let invalidElement = document.getElementById("invalidToast");
  let invalidToast = new bootstrap.Toast(invalidElement, {
    delay: 500
  });

  // Duplicate Contact Check
  if (!editContactForm.checkValidity()) {
    invalidToast.show(); // Activate Invalid Toast (Error Message)
    return;
  }

  else if (duplicateContactCheck(editContactFormDataObj) == false) {
    console.log("To be updated Values", editContactFormDataObj.name, editContactFormDataObj.number);
    // allContacts[indexToBeUpdated].name = editContactFormDataObj.name;
    // allContacts[indexToBeUpdated].number = editContactFormDataObj.number;

    await fetch('https://api.airtable.com/v0/appPLZ9OcsUMRfOMr/Contacts/' + idToBeUpdated, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer patswudjUsPEvI1SM.b67ac3c95d7ee8a96dcb153d0eba4d07e38ec07511fe4650cf2c96f560f3193d',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        "fields": {
          "Name": editContactFormDataObj.name,
          "Number": editContactFormDataObj.number
        }
      }
      )
    })

    contactEntries.innerHTML = ``; // Reset Table DOM
    //loadTable(allContacts);
    getAirTableData();
    // localStorage.clear();
    // for (let i = 0; i < allContacts.length; i++) {
    //   window.localStorage.setItem(allContacts[i].number, allContacts[i].name);
    // }

  }

}

// Created a letiable to pass between two functions
let numberToBeDeleted;

function deleteContactAlert(ele) {
  let deleteAlertElement = document.getElementById("deleteToastAlert");
  let deleteToastAlert = new bootstrap.Toast(deleteAlertElement, {
    delay: 10000
  });
  deleteToastAlert.show();

  numberToBeDeleted = ele;
}


async function deleteContact() {
  //window.localStorage.removeItem(numberToBeDeleted);
  await fetch('https://api.airtable.com/v0/appPLZ9OcsUMRfOMr/Contacts/' + numberToBeDeleted, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer patswudjUsPEvI1SM.b67ac3c95d7ee8a96dcb153d0eba4d07e38ec07511fe4650cf2c96f560f3193d' }
  })

  contactEntries.innerHTML = ``;
  getAirTableData(); // Update the entries after deletion.

  // Successful Delete Alert
  let deleteElement = document.getElementById("deleteToast");
  let deleteToast = new bootstrap.Toast(deleteElement, {
    delay: 3000
  });
  deleteToast.show();
}

function reset() {
  contactForm.reset();
}

function duplicateContactCheck(data) {
  for (let i = 0; i < allContacts.length; i++) {
    // Check for duplicates in the whole data
    if (!data.id && (data.name === allContacts[i].name || data.number === allContacts[i].number)) {

      // Duplicate Contact Alert
      let duplicateContactElement = document.getElementById("duplicateContactToast");
      let duplicateContactToast = new bootstrap.Toast(duplicateContactElement, {
        delay: 1000
      });
      duplicateContactToast.show();

      return true;
    }
    // Check for duplicates excluding the ToBeUpdated Contact
    else if (data.id && data.id != allContacts[i].id && (data.name === allContacts[i].name || data.number === allContacts[i].number)) {
      // Duplicate Contact Alert
      let duplicateContactElement = document.getElementById("duplicateContactToast");
      let duplicateContactToast = new bootstrap.Toast(duplicateContactElement, {
        delay: 1000
      });
      duplicateContactToast.show();

      return true;
    }
  }
  return false;
}

async function getAirTableData() {
  allContacts = [];

  await fetch('https://api.airtable.com/v0/appPLZ9OcsUMRfOMr/Contacts', {
    method: 'GET',
    headers: { Authorization: 'Bearer patswudjUsPEvI1SM.b67ac3c95d7ee8a96dcb153d0eba4d07e38ec07511fe4650cf2c96f560f3193d' }
  })
    .then(resp => resp.json())
    .then((data) => {
      for (let i = 0; i < data.records.length; i++) {
        let tempArr = []; // Using tempArr array to get the data stored in AirTable
        tempArr.id = data.records[i].id;
        tempArr.number = data.records[i].fields.Number;
        tempArr.name = data.records[i].fields.Name;

        allContacts.push(tempArr);
      }
    })

  // for (let i = 0; i < localStorage.length; i++) {
  //   let tempArr = []; // Using tempArr array to get the data stored in local storage
  //   tempArr.number = localStorage.key(i);
  //   tempArr.name = localStorage.getItem(tempArr.number);

  //   allContacts.push(tempArr); // Push the contacts retrieved from Local Storage to allContacts varialble
  // }

  loadTable(allContacts); // Display Data
}