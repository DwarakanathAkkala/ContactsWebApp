let container = document.createElement("div");
container.setAttribute("class", "container");
container.innerHTML = `
    <h1 id="title" class="text-center">Contacts Web App</h1>
    <p id="description" class="text-center">Enter details in the fields below, then press the "Submit" button to create the contact to your address book.</p>
    
    <div class="card">
        <div class="card-body">
            <form id="form" class="mb-4 row" novalidate>
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
                    <button class="btn btn-primary" id="submit" type="button" onclick=formSubmit(event)>Submit</button>
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
          Your opinion is recorded successfully.
        </div>
      </div>
    </div>

    <!--Delete Alert Toast-->
    <div class="toast-container position-fixed top-50 start-50 translate-middle" style="z-index: 11">
      <div id="deleteToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">This will delete your valuable contact :-)</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="d-grid gap-2 mb-3 d-md-flex mt-2 justify-content-md-center">
            <button class="btn btn-warning" id="deleteBtn" type="reset" onclick=deleteContact(number) data-bs-dismiss="toast">Delete</button>
            <button type="btn btn-primary" id="closeBtn" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Close</button>
        </div>
      </div>
    </div>


    <!--Contact Successful Delete Toast-->
    <div class="toast-container position-fixed top-50 start-50 translate-middle" style="z-index: 11">
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
`;


// Add Created DOM to HTML
document.body.append(container);

let contactEntries = document.getElementById("contactEntries");

window.onload = (event) => {
    document.getElementById("tableContainer").style.display = "block";
    getData();
};

// Target Form Element
const contactForm = document.getElementById("form");

function formSubmit() {


    // Activate Bootstrap Validations
    contactForm.classList.add("was-validated");

    // Create Bootstrap Toast Trigger
    let invalidElement = document.getElementById("invalidToast");
    let invalidToast = new bootstrap.Toast(invalidElement, {
        delay: 3000
    });

    // Get Contact Form Input Data    
    const formData = new FormData(contactForm);
    const formDataObj = Object.fromEntries(formData.entries());

    // Check for invalid form Values
    if (!contactForm.checkValidity()) {
        document.getElementById("checkboxOptions").style.display = "none";
        invalidToast.show(); // Activate Invalid Toast (Error Message)
        return;
    }

    // Success Scenario
    else {
        document.getElementById("tableContainer").style.display = "block";

        addData(formDataObj); // Add Form data to Table
        let validElement = document.getElementById("validToast");
        let validToast = new bootstrap.Toast(validElement, {
            delay: 3000
        });
        validToast.show(); // Activate Valid Toast (Success Message)
        contactForm.reset(); // Reset Form
        contactForm.classList.remove("was-validated"); // Remove Bootstrap Validation CSS
        document.getElementById("tableContainer").scrollIntoView(); // Move to Table
    }
};


// Function for adding Contact Form Data to Table
const addData = ((dataObj) => {
    console.log(dataObj);
    window.localStorage.setItem(dataObj.name, dataObj.number);
    getData();
});

// Function to get data from Local Storage
const getData = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let number = localStorage.key(i);
        let name = localStorage.getItem(number);
        contactEntries.innerHTML += `
        <tr>
            <td>${name}</td>
            <td>${number}</td>
            <td><button class="btn" id="editBtn" onClick="editContact()"><i class="fa fa-pencil-square" aria-hidden="true"></i></button> &nbsp; &nbsp;
            <button class="btn" id="deleteBtn" onClick="deleteContactAlert('${number}')"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
        </tr>`;
    }
}


function editContact() {
    console.log("Edit Function");
}

// Created a letiable to pass between two functions
let numberToBeDeleted;

function deleteContactAlert(value) {
    console.log('Value', value);
    let deleteElement = document.getElementById("deleteToast");
    let deleteToast = new bootstrap.Toast(deleteElement, {
        delay: 10000
    });
    deleteToast.show();

    numberToBeDeleted = value;
}


function deleteContact() {
    window.localStorage.removeItem(numberToBeDeleted);
    location.reload(); // Reloading to get the updated Data after Deletion.

}

function reset() {
    contactForm.reset();
}