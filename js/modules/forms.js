import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  //текстові повідомлення користувачу
  const message = {
    load: "img/form/spinner.svg",
    success: "Дякую! Ми з Вами скоро зв'яженося",
    failure: "Щось пішло не так...",
  };

  //взяти всі наші форми і підв'язати їх до функції //1 postData()
  forms.forEach((form) => {
    bindPostData(form);
  });

  //функція яка відповідає за постинг данних
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      // submit - спрацьовує кожен раз коли ми пробуємо відправити якусь форму
      e.preventDefault(); // відміняємо стандартну поведінку браузера

      //9 створюємо блок для виведення повідомлення користувачу
      let statusMessage = document.createElement("img");
      statusMessage.src = message.load;
      statusMessage.style.cssText = `display: block;
        margin: 0 auto;
        `;
      // form.appendChild(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  // lesson 85 продовдження роботи з формами, змінюємо оповіщення користувача
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    prevModalDialog.classList.remove("show");
    openModal(".modal", modalTimerId);

    const thanksMoodal = document.createElement("div");
    thanksMoodal.classList.add("modal__dialog");
    thanksMoodal.innerHTML = `
      <div class ="modal__content">
        <div class = "modal__close" data-close>×</div>
        <div class ="modal__title">${message}</div>
      </div>
      `;

    document.querySelector(".modal").append(thanksMoodal);
    setTimeout(() => {
      thanksMoodal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }
}

export default forms;
