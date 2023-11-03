<template>
  <form
    :class="v$.email.$error || v$.phoneNumber.$error ? `${classes} error` : `${classes}`"
    @submit.prevent="dataSend"
  >
    <div class="form-step_step" v-if="step === 1">
      <UiFormsValidsField :error="v$.email.$errors">
        <div class="form-step_email" :class="{error: v$.email.$error}">
          <UiFormsInput
            type="email"
            v-model="v$.email.$model"
            placeholder="name@company.com"
            @keyup.enter="validateEmail"
            autocomplete="off"
          />
        </div>
      </UiFormsValidsField>
      <div class="form-step_btn">
        <UiReusableButton
          @click="validateEmail"
          size="small"
          :variant="v$.email.$error ? 'danger' : 'white'"
        >
          {{ $t('banner.buttonForm[0]') }}
        </UiReusableButton>
      </div>
    </div>
    <div class="form-step_step step-next" v-if="step === 2">
      <UiFormsValidsField :error="v$.phoneNumber.$errors">
        <div class="form-step_phone" :class="{error: v$.phoneNumber.$error}">
          <UiFormsInput
            type="text"
            v-model="v$.phoneNumber.$model"
            placeholder="Номер телефона"
            @keyup.enter="dataSend"
            autocomplete="off"
            ref="phoneInput"
          />
        </div>
      </UiFormsValidsField>
      <div class="form-step_btn">
        <UiReusableButton
          size="small"
          :variant="v$.phoneNumber.$error ? 'danger' : 'white'"
          type="submit"
        >
          {{ $t('banner.buttonForm[1]') }}
        </UiReusableButton>
      </div>
    </div>
  </form>
</template>

<script setup>
  import {useVuelidate} from '@vuelidate/core';
  import {rules} from '../../Ui/Forms/rules';
  import axios from 'axios';
  import {toast} from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  const props = defineProps({
    classes: {
      type: String,
      default: 'form-step_form',
    },
  });
  // Настройки для уведомлений
  const createToastOptions = (type) => ({
    position: 'bottom-left',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
    distance: '1rem',
  });

  // Уведомление об успешной отправке
  const toastSuccess = () => {
    toast.success(`Успешно отправленно`, createToastOptions('success'));
  };

  // Константы для API
  const TOKEN = import.meta.env.VITE_TOKEN;
  const CHAT_ID = import.meta.env.VITE_CHAT_ID;

  // Реактивные свойства
  const dataForm = reactive({
    email: '',
    phoneNumber: '+380',
  });

  const v$ = useVuelidate(rules, dataForm);
  const step = ref(1);
  const isDataSendActive = ref(false);

  // Функции и методы

  // Переход к следующему шагу при верной валидации
  const validateEmail = () => {
    v$.value.$touch();
    if (!v$.value.email.$error) {
      step.value = 2;

      clearPhoneNumberTimeout = setTimeout(() => {
        v$.value.phoneNumber.$reset();
        v$.value.email.$reset();
        dataForm.email = '';
        step.value = 1;
      }, 7000);
    } else {
      setTimeout(() => {
        v$.value.$reset();
      }, 5000);
    }
  };

  // Формирование сообщения для отправки
  const formatMessage = () => {
    let message = `<b>Обращение с сайта kiosk-vending</b>%0A`;
    message += `<b>Email:</b> ${dataForm.email}%0A`;
    message += `<b>Телефон:</b> ${dataForm.phoneNumber}%0A`;
    return message;
  };

  let clearEmailTimeout = null;
  let clearPhoneNumberTimeout = null;
  let clearEmailErrorTimeout = null;
  // Наблюдение за полем Email
  watch(
    () => v$.value.email.$model,
    (newValue) => {
      // Если активирована логика dataSend, прекратите обработку
      if (isDataSendActive.value) return;

      if (v$.value.email.$error && newValue) {
        if (clearEmailErrorTimeout) {
          clearTimeout(clearEmailErrorTimeout);
          clearEmailErrorTimeout = null;
        }

        clearEmailErrorTimeout = setTimeout(() => {
          v$.value.email.$reset();
          dataForm.email = '';
        }, 13000);
      } else if (v$.value.email.$dirty && !newValue) {
        if (clearEmailTimeout) {
          clearTimeout(clearEmailTimeout);
        }

        clearEmailTimeout = setTimeout(() => {
          v$.value.email.$reset();
        }, 5000);
      } else {
        if (clearEmailErrorTimeout) {
          clearTimeout(clearEmailErrorTimeout);
          clearEmailErrorTimeout = null;
        }

        if (clearEmailTimeout) {
          clearTimeout(clearEmailTimeout);
          clearEmailTimeout = null;
        }
      }
    },
  );

  // Наблюдение за полем номера телефона
  watch(
    () => v$.value.phoneNumber.$model,
    (newValue) => {
      if (newValue && newValue !== '+380') {
        if (clearPhoneNumberTimeout) {
          clearTimeout(clearPhoneNumberTimeout);
          clearPhoneNumberTimeout = null;
        }

        clearPhoneNumberTimeout = setTimeout(() => {
          v$.value.phoneNumber.$reset();
          v$.value.email.$reset();
          dataForm.email = '';
          dataForm.phoneNumber = '+380';
          step.value = 1;
        }, 15000);
      }
    },
  );
  // Отправка данных
  const dataSend = async () => {
    isDataSendActive.value = true;

    v$.value.$touch();
    const message = formatMessage();
    const POST = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`;

    if (v$.value.$error) {
      console.log('error');
    } else {
      axios.post(POST, {parse_mode: 'html'});
      toastSuccess();
      v$.value.$reset();
      dataForm.email = '';
      dataForm.phoneNumber = '+380';
      step.value = 1;
    }

    isDataSendActive.value = false;
  };
</script>

<style lang="scss" scoped>
  .form-step_form {
    width: 44rem;
    height: 6.5rem;
    border-radius: 5.6rem;
    border: 1px solid #fff;
    padding: 1.2rem 1.6rem;
    padding-left: 4rem;
    @include flex(row, '', center);
    gap: 3.4rem;
    transition: all ease 0.4s;
    margin-bottom: 2rem;
    &.error {
      border: 0.1rem solid $danger;
      transition: all ease 0.4s;
    }
  }
  .form-step_phone,
  .form-step_email {
    width: 17rem;
    height: 2.4rem;
  }

  .form-step_email,
  .form-step_phone,
  :deep(.input::placeholder) {
    color: white;
  }
  .form-step_email,
  .form-step_phone,
  :deep(.input) {
    color: white;
  }
  .form-step_btn {
    width: 100%;
  }
  .form-step_step {
    @include flex(row, '', center);
    width: 100%;
  }

  @include media('max', 'sm') {
    .form-step_form {
      width: 80%;
      height: 3.8rem;
      border-radius: 5.6rem;
      border: 1px solid #fff;
      padding: 1.2rem 0.7rem;
      padding-left: 2rem;
      position: relative;
      z-index: 22;
      @include flex(row, '', center);
      gap: 1rem;
      transition: all ease 0.4s;
      margin-bottom: 2rem;
    }

    .form-step_email {
      width: 15rem;
      height: 2.4rem;
    }
    .form-step_phone {
      width: 15rem;
      height: 2.4rem;
    }
  }
</style>
