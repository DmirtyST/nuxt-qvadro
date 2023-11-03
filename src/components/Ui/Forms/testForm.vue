<template>
  <div>
    <!--Этот пример сделанн что бы не забыть как делать форму )))-->
    <form class="form" @submit.prevent="dataSend">
      <!--все передающие свойства через v$ это обьект в котором хранятся разные свойства $errors  $error и тд)))-->
      <UiFormsValidsField :error="v$.name.$errors">
        <div class="input" :class="{error: v$.name.$error}">
          <UiFormsInput v-model="v$.name.$model" placeholder="Введите имя" />
        </div>
      </UiFormsValidsField>
      <!--Мы передали в пропс erorr которые принимает v$.email.$errors это сообщение об ошибках касательно эмейл -->
      <UiFormsValidsField :error="v$.email.$errors">
        <div class="input" :class="{error: v$.email.$error}">
          <UiFormsInput
            type="email"
            v-model="v$.email.$model"
            placeholder="Введите eмейл"
          />
        </div>
      </UiFormsValidsField>
      <!--Тут в кнопке условия на смену варинта и дизайблед если v$.$error  -->
      <UiReusableButton
        type="submit"
        :disabled="v$.$error ? true : false"
        :variant="v$.$error ? 'danger' : 'primary'"
        >Отпрвить
        </UiReusableButton
      >
    </form>
  </div>
</template>

<script setup>
  import {useVuelidate} from '@vuelidate/core';
  import {rules} from '../components/Ui/Forms/rules';
  const dataForm = reactive({
    name: '',
    email: '',
  });
  /** Ниже константа как раз и говорит что обьект v$ rules в катором хранятся вся валидатся ну и сам обьект в котором
   * указаны имена текстовых полей
   */
  const v$ = useVuelidate(rules, dataForm);

  const dataSend = async () => {
    /** v$.value.$touch() начинает задейстовать валидацию при попытке отправить форму */
    v$.value.$touch();
    /** Условие если erorr то ошибка если нет , то отправка формы  */
    if (v$.value.$error) {
      console.log('error');
    } else {
      /** При отправке формы очищаются поля и с помощью v$.value.$reset(); обирается ошибка валидации */
      dataForm.name = '';
      dataForm.email = '';
      v$.value.$reset();
    }
  };
</script>

<style lang="scss" scoped>
  .form {
    max-width: 40rem;
    margin: 0 auto;
    margin-top: 20rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 2rem;
  }
  .input {
    background-color: rgb(134, 159, 235);
    border-radius: 1rem;
    padding: 1rem;
    min-height: 4rem;
    position: relative;
    display: flex;
    border: 1px solid rgb(134, 159, 235);
    transition: all ease 0.4s;
    &.error {
      border: 1px solid red;
      transition: all ease 0.4s;
    }
  }
</style>
