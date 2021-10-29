document.addEventListener('DOMContentLoaded', () => {
 
  /*-------------------- Menu --------------------*/

  function menuTransformation() {
    menu.classList.toggle('menu-burger_active');
  }

  const menu = document.querySelector('.menu-burger');

  menu.addEventListener('click', () => {
    menuTransformation();
  }); 

  /*-------------------- Modal --------------------*/

  function openModal() {
    modal.classList.add('popup_visiable');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('popup_visiable');
    document.body.style.overflow = '';
  }

  const modalsOpen = document.querySelectorAll('[data-open]'),
        modalBody = document.querySelector('.popup__body'),
        modal = document.querySelector('.popup'),
        modalContent = document.querySelector('.content');

  modalsOpen.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });
  });

  modalBody.addEventListener('click', (event) => {
    if (event.target === modalBody || event.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeModal();
    }
  });

  /*-------------------- Form --------------------*/

  const form = document.querySelector('.form');

  form.addEventListener('submit', formSend);

  function formValidate(form) {
    let error = 0;

    let formRequired = document.querySelectorAll('._req')

    for (let i = 0; i < formRequired.length; i++) {
      const input = formRequired[i];
      formRemoveError(input);
      
      console.log(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      }

      else if (input.value === '') {
        formAddError(input);
        error++;
      }
    }

    return error;
  }

  async function formSend(event) {
    event.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      await fetch('server.php', {
        method: 'POST',
        body: formData
      })
      .then(() => {
        showThanksModal();
        // modalContent.classList.add('hidden');
      })
      .finally(() => {
        form.reset();
      });

    } else {
      alert("Ошибка, убедитесь в правильности ввода данных.");
    }
  }

  function showThanksModal() {
    modalContent.classList.add('hidden');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('successfully');
    thanksModal.innerHTML = `
      <div class="successfully__message title-md">
        Message successfully sent!
      </div>
      <div class="successfully__close" data-close>
        ✖
      </div>
    `;

    modalBody.append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      modalContent.classList.remove('hidden');
      closeModal();
    }, 4000);
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});


