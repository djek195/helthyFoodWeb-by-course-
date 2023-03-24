function tabs(tabsSelector, tabsContentSelectorm, tabsParentSelector, activeClass) {
  //tabs
  const tabs = {
    tabsItem: document.querySelectorAll(tabsSelector),
    tabContent: document.querySelectorAll(tabsContentSelectorm),
    tabheader: document.querySelector(tabsParentSelector),
  };

  //tabs
  function hideTabContent() {
    tabs.tabContent.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("show", "fade");
    });

    tabs.tabsItem.forEach((el) => {
      el.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabs.tabContent[i].classList.add("show", "fade");
    tabs.tabContent[i].classList.remove("hide");

    tabs.tabsItem[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabs.tabheader.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.tabsItem.forEach((el, i) => {
        if (el === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}


export default tabs;