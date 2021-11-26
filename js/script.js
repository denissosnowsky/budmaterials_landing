window.addEventListener("DOMContentLoaded", () => {
  ////// image
  let video = document.querySelector("video");
  let videWrapper = document.querySelector(".header__video");

  console.log("hello!");
  if (
    window
      .getComputedStyle(document.querySelector("body"))
      .width.replace(/[A-Za-z]/g, "") <= 576
  ) {
    video.remove();
    let imageWrapper = document.createElement("div");
    imageWrapper.classList.add("imageForVideo");
    imageWrapper.innerHTML = `
            <img src="./images/videoimage.jpg" alt="videoimage"/>
        `;
    videWrapper.append(imageWrapper);
  }

  ///slider

  function sliders(innerAr, slideAr, itemAr, nextbtnAr, prevbtnAr, wrapperAr) {
    const inner = document.querySelector(innerAr),
      slide = document.querySelectorAll(slideAr),
      menu = document.querySelectorAll(itemAr),
      next = document.querySelector(nextbtnAr),
      prev = document.querySelector(prevbtnAr),
      wrapper = document.querySelector(wrapperAr),
      width = window.getComputedStyle(wrapper).width;

    let offset = 0,
      slideIndex = 1;

    slide.forEach((item) => {
      item.style.width = width;
    });

    inner.style.width = 100 * slide.length + "%";

    function deleteNotDigits(str) {
      return +str.replace(/[A-Za-z]/g, "");
    }

    function nextBtn() {
      if (offset == deleteNotDigits(width) * (slide.length - 1)) {
        offset = 0;
      } else {
        offset += deleteNotDigits(width);
      }

      inner.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slide.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
    }

    next.addEventListener("click", nextBtn);

    prev.addEventListener("click", () => {
      if (offset == 0) {
        offset = deleteNotDigits(width) * (slide.length - 1);
      } else {
        offset -= deleteNotDigits(width);
      }

      inner.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
        slideIndex = slide.length;
      } else {
        slideIndex--;
      }
    });

    menu.forEach((item, i) => {
      item.addEventListener("click", (e) => {
        slideIndex = e.target.getAttribute("data-slide");

        offset = deleteNotDigits(width) * (slideIndex - 1);
        inner.style.transform = `translateX(-${offset}px)`;
      });
    });

    setInterval(nextBtn, 4000);
  }

  sliders(
    ".slider1__inner",
    ".slider1__slide",
    ".slider1-item",
    ".slider1__next-btn-wrapper",
    ".slider1__prev-btn-wrapper",
    ".slider1__wrapper"
  );
  sliders(
    ".slider2__inner",
    ".slider2__slide",
    ".slider2-item",
    ".slider2__next-btn-wrapper",
    ".slider2__prev-btn-wrapper",
    ".slider2__wrapper"
  );
  sliders(
    ".slider3__inner",
    ".slider3__slide",
    ".slider3-item",
    ".slider3__next-btn-wrapper",
    ".slider3__prev-btn-wrapper",
    ".slider3__wrapper"
  );

  ///// modals
  const consultBtn1 = document.querySelector(
      ".consult-backgr-dark-btn-wrapper"
    ),
    consultBtn2 = document.querySelector(".service-btn-wrapper"),
    questionBtn = document.querySelector(
      ".header__nav-wrapper-question-wrapper"
    ),
    priceBtn = document.querySelector(".assortment__btn-wrapper"),
    closeBtn = document.querySelectorAll("[data-close]"),
    blackWall = document.querySelector(".modal__wrapper"),
    consultForm = document.querySelector(".modal__consultation"),
    questionForm = document.querySelector(".modal__question"),
    priceForm = document.querySelector(".modal__price"),
    thanksForm = document.querySelector(".modal__thanks"),
    errorForm = document.querySelector(".modal__error"),
    bodyElement = document.querySelector("body");

  function showConsultForm() {
    bodyElement.style.overflow = "hidden";
    blackWall.style.display = "block";
    consultForm.style.display = "block";
  }
  function showQuestionForm() {
    bodyElement.style.overflow = "hidden";
    blackWall.style.display = "block";
    questionForm.style.display = "block";
  }
  function showPriceForm() {
    bodyElement.style.overflow = "hidden";
    blackWall.style.display = "block";
    priceForm.style.display = "block";
  }

  function hideForms() {
    blackWall.style.display = "none";
    consultForm.style.display = "none";
    priceForm.style.display = "none";
    questionForm.style.display = "none";
    thanksForm.style.display = "none";
    errorForm.style.display = "none";
    bodyElement.style.overflow = "";
  }

  consultBtn1.addEventListener("click", () => {
    showConsultForm();
  });
  consultBtn2.addEventListener("click", () => {
    showConsultForm();
  });
  questionBtn.addEventListener("click", () => {
    showQuestionForm();
  });
  priceBtn.addEventListener("click", () => {
    showPriceForm();
  });

  closeBtn.forEach((item) => {
    item.addEventListener("click", () => {
      hideForms();
    });
  });

  blackWall.addEventListener("click", (e) => {
    if (e.target == blackWall) {
      hideForms();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      consultForm.style.display == "block" ||
      questionForm.style.display == "block" ||
      thanksForm.style.display == "block" ||
      errorForm.style.display == "block" ||
      priceForm.style.display == "block"
    ) {
      if (e.code == "Escape") {
        hideForms();
      }
    }
  });

  ///////// Forms

  const allForms = document.querySelectorAll("[data-form]");

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res;
  };

  function showThanksForm() {
    bodyElement.style.overflow = "hidden";
    blackWall.style.display = "block";
    thanksForm.style.display = "block";
  }

  function showErrorForm() {
    bodyElement.style.overflow = "hidden";
    blackWall.style.display = "block";
    errorForm.style.display = "block";
  }

  function sendData(form, url) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let spinner = document.createElement("img");
      spinner.src = "icons/spinner.svg";
      spinner.style.cssText = "display: block; margin: 0 auto;";
      form.insertAdjacentElement("afterend", spinner);

      const formData = new FormData(form);

      postData(url, formData)
        .then(() => {
          spinner.remove();
          hideForms();
          showThanksForm();
          setTimeout(hideForms, 2000);
        })
        .catch(() => {
          spinner.remove();
          hideForms();
          showErrorForm();
          setTimeout(hideForms, 2000);
        })
        .finally(() => {
          form.reset();
        });
    });
  }
  allForms.forEach((item) => {
    sendData(item, "handler.php");
  });

  ///// Arrow

  const fixedArrow = document.querySelector(".fixed__arrow");

  function hideArrow() {
    fixedArrow.style.display = "none";
  }

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1000) {
      fixedArrow.classList.remove("animate__fadeOut");
      fixedArrow.style.display = "block";
    } else {
      fixedArrow.classList.add("animate__fadeOut");
      setTimeout(() => hideArrow(), 600);
    }
  });

  /////Fixed Header
  const fixedHeader = document.querySelector(".header__nav");

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 60) {
      fixedHeader.classList.remove("opacityIn");
      fixedHeader.classList.add("opacityOut");
    } else {
      fixedHeader.classList.remove("opacityOut");
      fixedHeader.classList.add("opacityIn");
    }
  });
});
