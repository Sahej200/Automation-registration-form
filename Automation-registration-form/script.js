// // ========= ELEMENTS ==========
// const form = document.getElementById("registrationForm");
// const submitBtn = document.getElementById("submitBtn");
// const formAlert = document.getElementById("formAlert");

// const firstName = document.getElementById("firstName");
// const lastName = document.getElementById("lastName");
// const email = document.getElementById("email");
// const phone = document.getElementById("phone");

// const genderGroup = document.querySelectorAll("input[name='gender']");
// const country = document.getElementById("country");
// const state = document.getElementById("state");
// const city = document.getElementById("city");

// const password = document.getElementById("password");
// const confirmPassword = document.getElementById("confirmPassword");
// const pwdBar = document.getElementById("pwdBar");
// const pwdText = document.getElementById("pwdText");
// const terms = document.getElementById("terms");

// // ------------------------------
// // COUNTRY PHONE CODE MAP
// // ------------------------------
// function getCountryPhoneCode(iso) {
//     const codes = {
//         "IN": "+91",
//         "US": "+1",
//         "GB": "+44",
//         "CA": "+1",
//         "AU": "+61",
//         "PK": "+92",
//         "BD": "+880",
//         "LK": "+94"
//     };
//     return codes[iso] || "+00";
// }

// // ------------------------------
// // LOAD COUNTRIES
// // ------------------------------
// async function loadCountries() {
//     const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
//     const data = await res.json();

//     country.innerHTML = `<option value="">Select Country</option>`;

//     data.data.forEach(c => {
//         const option = document.createElement("option");
//         option.value = c.name;
//         option.textContent = c.name;
//         option.setAttribute("data-iso", c.iso2);
//         country.appendChild(option);
//     });
// }

// loadCountries();

// // ------------------------------
// // LOAD STATES
// // ------------------------------
// country.addEventListener("change", async () => {
//     state.innerHTML = `<option value="">Loading...</option>`;
//     city.innerHTML = `<option value="">Select City</option>`;
//     city.disabled = true;

//     const iso = country.options[country.selectedIndex].getAttribute("data-iso");

//     // Set phone country code automatically
//     phone.value = getCountryPhoneCode(iso) + " ";

//     const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({ country: country.value })
//     });

//     const data = await res.json();
//     state.innerHTML = `<option value="">Select State</option>`;

//     data.data.states.forEach(s => {
//         const opt = document.createElement("option");
//         opt.value = s.name;
//         opt.textContent = s.name;
//         state.appendChild(opt);
//     });

//     state.disabled = false;
// });

// // ------------------------------
// // LOAD CITIES
// // ------------------------------
// state.addEventListener("change", async () => {
//     city.innerHTML = `<option>Loading...</option>`;
//     city.disabled = true;

//     const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             country: country.value,
//             state: state.value
//         })
//     });

//     const data = await res.json();
//     city.innerHTML = `<option value="">Select City</option>`;

//     data.data.forEach(c => {
//         const opt = document.createElement("option");
//         opt.value = c;
//         opt.textContent = c;
//         city.appendChild(opt);
//     });

//     city.disabled = false;
// });

// // ------------------------------
// // PASSWORD STRENGTH METER
// // ------------------------------
// password.addEventListener("input", () => {
//     const val = password.value;
//     let score = 0;

//     if (val.length > 6) score++;
//     if (/[A-Z]/.test(val)) score++;
//     if (/[0-9]/.test(val)) score++;
//     if (/[@$!%*#?&]/.test(val)) score++;

//     pwdBar.style.width = (score * 25) + "%";

//     pwdText.textContent =
//         score <= 1 ? "Strength: Weak" :
//         score === 2 ? "Strength: Medium" :
//         "Strength: Strong";

//     pwdBar.style.background =
//         score <= 1 ? "red" :
//         score === 2 ? "orange" :
//         "green";
// });

// // ------------------------------
// // CONFIRM PASSWORD
// // ------------------------------
// confirmPassword.addEventListener("input", () => {
//     if (password.value !== confirmPassword.value) {
//         document.getElementById("err-confirmPassword").textContent = "Passwords do not match";
//     } else {
//         document.getElementById("err-confirmPassword").textContent = "";
//     }
// });

// // ------------------------------
// // PHONE VALIDATION
// // ------------------------------
// phone.addEventListener("input", () => {
//     if (!country.value) {
//         document.getElementById("err-phone").textContent = "";
//         return;
//     }

//     const iso = country.options[country.selectedIndex].getAttribute("data-iso");
//     const expectedCode = getCountryPhoneCode(iso);

//     if (phone.value && !phone.value.startsWith(expectedCode)) {
//         document.getElementById("err-phone").textContent =
//             "Invalid! Phone must start with " + expectedCode;
//     } else {
//         document.getElementById("err-phone").textContent = "";
//     }
// });

// // ------------------------------
// // FORM SUBMIT
// // ------------------------------
// form.addEventListener("submit", (e) => {
//     e.preventDefault(); // always prevent default

//     let hasError = false;

//     // First Name
//     if (!firstName.value.trim()) {
//         document.getElementById("err-firstName").textContent = "First Name is required";
//         hasError = true;
//     } else {
//         document.getElementById("err-firstName").textContent = "";
//     }

//     // Last Name
//     if (!lastName.value.trim()) {
//         document.getElementById("err-lastName").textContent = "Last Name is required";
//         hasError = true;
//     } else {
//         document.getElementById("err-lastName").textContent = "";
//     }

//     // Email
//     if (!email.value.trim()) {
//         document.getElementById("err-email").textContent = "Email is required";
//         hasError = true;
//     } else {
//         document.getElementById("err-email").textContent = "";
//     }

//     // Phone
//     const iso = country.options[country.selectedIndex]?.getAttribute("data-iso");
//     const expectedCode = getCountryPhoneCode(iso);

//     if (!phone.value.trim()) {
//         document.getElementById("err-phone").textContent = "Phone is required";
//         hasError = true;
//     } else if (!phone.value.startsWith(expectedCode)) {
//         document.getElementById("err-phone").textContent = "Phone must start with " + expectedCode;
//         hasError = true;
//     } else {
//         document.getElementById("err-phone").textContent = "";
//     }

//     // Gender
//     const genderChecked = [...genderGroup].some(g => g.checked);
//     if (!genderChecked) {
//         document.getElementById("err-gender").textContent = "Select at least one gender";
//         hasError = true;
//     } else {
//         document.getElementById("err-gender").textContent = "";
//     }

//     // Password
//     if (!password.value) {
//         document.getElementById("err-password").textContent = "Password is required";
//         hasError = true;
//     } else {
//         document.getElementById("err-password").textContent = "";
//     }

//     // Confirm Password
//     if (confirmPassword.value !== password.value) {
//         document.getElementById("err-confirmPassword").textContent = "Passwords do not match";
//         hasError = true;
//     } else {
//         document.getElementById("err-confirmPassword").textContent = "";
//     }

//     // Terms
//     if (!terms.checked) {
//         document.getElementById("err-terms").textContent = "You must agree to the terms";
//         hasError = true;
//     } else {
//         document.getElementById("err-terms").textContent = "";
//     }

//     if (!hasError) {
//         // Success
//         formAlert.className = "alert success";
//         formAlert.textContent = "Registration Successful!";
//         formAlert.style.display = "block";

//         form.reset();
//         pwdBar.style.width = "0%";
//         pwdText.textContent = "Strength: -";
//     } else {
//         formAlert.className = "alert error";
//         formAlert.textContent = "Please fix the errors above";
//         formAlert.style.display = "block";
//     }
// });

// // Make sure submit button is **always enabled**
// submitBtn.disabled = false;
// ========= ELEMENTS ==========
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const formAlert = document.getElementById("formAlert");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const genderGroup = document.querySelectorAll("input[name='gender']");
const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const pwdBar = document.getElementById("pwdBar");
const pwdText = document.getElementById("pwdText");
const terms = document.getElementById("terms");

// ------------------------------
// COUNTRY PHONE CODE MAP
// ------------------------------
function getCountryPhoneCode(iso) {
    const codes = {
        "IN": "+91",
        "US": "+1",
        "GB": "+44",
        "CA": "+1",
        "AU": "+61",
        "PK": "+92",
        "BD": "+880",
        "LK": "+94"
    };
    return codes[iso] || "+00";
}

// ------------------------------
// LOAD COUNTRIES
// ------------------------------
async function loadCountries() {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
    const data = await res.json();

    country.innerHTML = `<option value="">Select Country</option>`;

    data.data.forEach(c => {
        const option = document.createElement("option");
        option.value = c.name;
        option.textContent = c.name;
        option.setAttribute("data-iso", c.iso2);
        country.appendChild(option);
    });
}
loadCountries();

// ------------------------------
// LOAD STATES
// ------------------------------
country.addEventListener("change", async () => {
    state.innerHTML = `<option value="">Loading...</option>`;
    city.innerHTML = `<option value="">Select City</option>`;
    city.disabled = true;

    const iso = country.options[country.selectedIndex].getAttribute("data-iso");

    // Only insert country code if phone is empty
    if (!phone.value.trim()) {
        phone.value = getCountryPhoneCode(iso) + " ";
    }

    // Validate phone number
    if (phone.value && !phone.value.startsWith(getCountryPhoneCode(iso))) {
        document.getElementById("err-phone").textContent =
            "Invalid! Phone must start with " + getCountryPhoneCode(iso);
    } else {
        document.getElementById("err-phone").textContent = "";
    }

    const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ country: country.value })
    });

    const data = await res.json();
    state.innerHTML = `<option value="">Select State</option>`;
    data.data.states.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.name;
        opt.textContent = s.name;
        state.appendChild(opt);
    });
    state.disabled = false;
});

// ------------------------------
// LOAD CITIES
// ------------------------------
state.addEventListener("change", async () => {
    city.innerHTML = `<option>Loading...</option>`;
    city.disabled = true;

    const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            country: country.value,
            state: state.value
        })
    });

    const data = await res.json();
    city.innerHTML = `<option value="">Select City</option>`;
    data.data.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        city.appendChild(opt);
    });
    city.disabled = false;
});

// ------------------------------
// PASSWORD STRENGTH METER
// ------------------------------
password.addEventListener("input", () => {
    const val = password.value;
    let score = 0;

    if (val.length > 6) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[@$!%*#?&]/.test(val)) score++;

    pwdBar.style.width = (score * 25) + "%";
    pwdText.textContent =
        score <= 1 ? "Strength: Weak" :
        score === 2 ? "Strength: Medium" :
        "Strength: Strong";
    pwdBar.style.background =
        score <= 1 ? "red" :
        score === 2 ? "orange" :
        "green";
});

// ------------------------------
// CONFIRM PASSWORD
// ------------------------------
confirmPassword.addEventListener("input", () => {
    if (password.value !== confirmPassword.value) {
        document.getElementById("err-confirmPassword").textContent = "Passwords do not match";
    } else {
        document.getElementById("err-confirmPassword").textContent = "";
    }
});

// ------------------------------
// PHONE VALIDATION
// ------------------------------
phone.addEventListener("input", () => {
    const iso = country.options[country.selectedIndex]?.getAttribute("data-iso");
    const expectedCode = getCountryPhoneCode(iso);

    if (phone.value && iso && !phone.value.startsWith(expectedCode)) {
        document.getElementById("err-phone").textContent =
            "Invalid! Phone must start with " + expectedCode;
    } else {
        document.getElementById("err-phone").textContent = "";
    }
});

// ------------------------------
// FORM SUBMIT
// ------------------------------
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let hasError = false;

    // First Name
    if (!firstName.value.trim()) {
        document.getElementById("err-firstName").textContent = "First Name is required";
        hasError = true;
    } else document.getElementById("err-firstName").textContent = "";

    // Last Name
    if (!lastName.value.trim()) {
        document.getElementById("err-lastName").textContent = "Last Name is required";
        hasError = true;
    } else document.getElementById("err-lastName").textContent = "";

    // Email
    if (!email.value.trim()) {
        document.getElementById("err-email").textContent = "Email is required";
        hasError = true;
    } else document.getElementById("err-email").textContent = "";

    // Phone
    const iso = country.options[country.selectedIndex]?.getAttribute("data-iso");
    const expectedCode = getCountryPhoneCode(iso);
    if (!phone.value.trim()) {
        document.getElementById("err-phone").textContent = "Phone is required";
        hasError = true;
    } else if (!phone.value.startsWith(expectedCode)) {
        document.getElementById("err-phone").textContent = "Phone must start with " + expectedCode;
        hasError = true;
    } else document.getElementById("err-phone").textContent = "";

    // Gender
    const genderChecked = [...genderGroup].some(g => g.checked);
    if (!genderChecked) {
        document.getElementById("err-gender").textContent = "Select at least one gender";
        hasError = true;
    } else document.getElementById("err-gender").textContent = "";

    // Password
    if (!password.value) {
        document.getElementById("err-password").textContent = "Password is required";
        hasError = true;
    } else document.getElementById("err-password").textContent = "";

    // Confirm Password
    if (confirmPassword.value !== password.value) {
        document.getElementById("err-confirmPassword").textContent = "Passwords do not match";
        hasError = true;
    } else document.getElementById("err-confirmPassword").textContent = "";

    // Terms
    if (!terms.checked) {
        document.getElementById("err-terms").textContent = "You must agree to the terms";
        hasError = true;
    } else document.getElementById("err-terms").textContent = "";

    // Final result
    if (!hasError) {
        formAlert.className = "alert success";
        formAlert.textContent = "Registration Successful!";
        formAlert.style.display = "block";
        form.reset();
        pwdBar.style.width = "0%";
        pwdText.textContent = "Strength: -";
    } else {
        formAlert.className = "alert error";
        formAlert.textContent = "FILL CORRECTLY ALL THE FIELDS";
        formAlert.style.display = "block";
    }
});

// ------------------------------
// MAKE SUBMIT ALWAYS ENABLED
// ------------------------------
submitBtn.disabled = false;
