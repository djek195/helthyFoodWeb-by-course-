document.addEventListener("DOMContentLoaded", () => {
  //tabs selectors
  const tabs = {
    tabsItem: document.querySelectorAll(".tabheader__item"),
    tabContent: document.querySelectorAll(".tabcontent"),
    tabheader: document.querySelector(".tabheader"),
  };
  //timer selectors
  // const timer = {

  // }

  //tabs
  function hideTabContent() {
    tabs.tabContent.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("show", "fade");
    });

    tabs.tabsItem.forEach((el) => {
      el.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabs.tabContent[i].classList.add("show", "fade");
    tabs.tabContent[i].classList.remove("hide");

    tabs.tabsItem[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabs.tabheader.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.tabsItem.forEach((el, i) => {
        if (el === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //timer
  const deadline = "2023-05-20";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / 1000 / 60) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
  //modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  // modalCloseBtn = document.querySelector("[data-close]"); //видалили під час створення нового модального вікна зі сповіщенням

  function openModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide");
    // modal.classList.toggle('show');
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show", "fade");
    // modal.classList.toggle('show');
    document.body.style.overflow = "";
  }

  // modalCloseBtn.addEventListener("click", closeModal); //видалили під час створення нового модального вікна зі сповіщенням

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target === modal || target.getAttribute("data-close") === "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // испольуем классі для карточек
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes; //сюди передається масив (...restOperator)
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
           <img src=${this.src} alt=${this.alt}>
           <h3 class="menu__item-subtitle">${this.title}</h3>
           <div class="menu__item-descr">${this.descr}</div>
           <div class="menu__item-divider"></div>
           <div class="menu__item-price">
             <div class="menu__item-cost">Цена:</div>
             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
           </div>
      `;
      this.parent.append(element);
    }
  }

  // const div = new MenuCard();
  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container",
    "menu__item",
    "big"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    14,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    21,
    ".menu .container",
    "menu__item"
  ).render();

  //XMLHttpRequest

  const forms = document.querySelectorAll("form");

  //8 текстові повідомлення користувачу
  const message = {
    load: "img/form/spinner.svg",
    success: "Дякую! Ми з Вами скоро зв'яженося",
    failure: "Щось пішло не так...",
  };

  //12 взяти всі наші форми і підв'язати їх до функції //1 postData()
  forms.forEach((form) => {
    postData(form);
  });

  //1 функція яка відповідає за постинг данних
  function postData(form) {
    form.addEventListener("submit", (e) => {
      //2 submit - спрацьовує кожен раз коли ми пробуємо відправити якусь форму
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

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      fetch("server.php", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(object),
      })
        .then((data) => data.text())
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
    openModal();

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
      closeModal();
    }, 4000);
  }

  // API - Aplication programming interface (набір даних і можливостей які нам надає якесь готове рішення)
  //DOM API
  // інтерфейс з яким користувач може працювати (наприклад в телефоні налаштування вібро, камери)
  //FETCH API

  // fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: "POsT",
  //   body: JSON.stringify({ name: "Alex" }),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
});
