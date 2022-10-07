let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );
  document.querySelectorAll(".colorsList li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".randomBackgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".randomBackgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".randomBackgrounds .no").classList.add("active");
  }
}
document.querySelector(".toggleSettings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settingBox").classList.toggle("open");
};

const switchColors = document.querySelectorAll(".colorsList li");

switchColors.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    // e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    //   element.classList.remove("active");
    // });
    // e.target.classList.add("active");
    handleActive(e);
  });
});
const randomBackground = document.querySelectorAll(".randomBackgrounds span");

randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeTmages();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

let landingPage = document.querySelector(".landing-page");
let imgArray = [
  "img-1.jpg",
  "img-2.jpg",
  "img-3.jpg",
  "img-4.jpg",
  "img-5.jpg",
];

function randomizeTmages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomImg = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage =
        'url("../images/' + imgArray[randomImg] + '")';
    }, 10000);
  }
}
randomizeTmages();

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffSetTop = ourSkills.offsetTop;

  let skillsOuterHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop >= skillsOffSetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
  // console.log(skillsOffSetTop);
};

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const allbullets = document.querySelectorAll(".navBullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollto(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollto(allbullets);
scrollto(allLinks);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bulletsOption span");
let bulletsContainer = document.querySelector(".navBullets");
let bulletsLocalIetm = localStorage.getItem("bulletsOption");

if (bulletsLocalIetm !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalIetm === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bulletsOption .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bulletsOption .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.bullets === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bulletsOption", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bulletsOption", "none");
    }
    handleActive(e);
  });
});

document.querySelector(".resetOptions").onclick = function () {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bulletsOption");
  window.location.reload();
};

// to deal with toggle menu

let toggleBtn = document.querySelector(".toggleMenu");
let theLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  theLinks.classList.toggle("open");
};
theLinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== theLinks) {
    if (theLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      theLinks.classList.toggle("open");
    }
  }
});