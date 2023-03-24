function openModal(modalSelector, modalTimerId) {
  modal = document.querySelector(modalSelector);

  modal.classList.add("show", "fade");
  modal.classList.remove("hide");
  // modal.classList.toggle('show');
  document.body.style.overflow = "hidden";

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show", "fade");
  // modal.classList.toggle('show');
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //modal

  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });


  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target === modal || target.getAttribute("data-close") === "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
