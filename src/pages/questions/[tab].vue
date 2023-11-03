<template>
  <div class="questions">
    <UiContainer width="124">
      <div class="questions_row">
        <div class="questions_title">{{ $t('questions.title') }}</div>
        <div class="questions_tabs">
          <UiTabsTabSQuestions>
            <template v-slot:technical>
              <ul class="questions_tabs-content term">
                <li
                  class="questions_text"
                  v-for="(text, index) in warrantyTerms"
                  :key="index"
                >
                  <p>{{ $t(`questions.term[${index}]`) }}</p>
                </li>
              </ul>
            </template>
            <template v-slot:details>
              <ul class="questions_tabs-content prro">
                <li
                  class="questions_text"
                  v-for="(text, index) in warrantyPRRO"
                  :key="index"
                >
                  <p v-html="$t(`questions.prro[${index}]`)"></p>
                </li>
              </ul>
            </template>
            <template v-slot:time-work>
              <ul class="questions_tabs-content work">
                <li
                  class="questions_text"
                  v-for="(text, index) in warrantyWorkPRRO"
                  :key="index"
                >
                  <p v-html="$t(`questions.prroWork[${index}]`)"></p>
                </li>
              </ul>
            </template>
            <template v-slot:energy>
              <ul class="questions_tabs-content energy">
                <li
                  class="questions_text"
                  v-for="(text, index) in warrantyEnergy"
                  :key="index"
                >
                  <p v-html="$t(`questions.energy[${index}]`)"></p>
                </li>
              </ul>
            </template>
          </UiTabsTabSQuestions>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script setup>
  const warrantyTerms = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  const warrantyPRRO = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ' ',
    '',
  ];

  const warrantyWorkPRRO = ['', '', '', '', '', '', '', ''];

  const warrantyEnergy = ['', '', '', ''];
</script>

<style lang="scss" scoped>
  .questions {
    &_title {
      color: #051441;
      @include font(4rem, 4rem, '', 500);
      width: 66rem;
      margin-bottom: 4rem;
      color: var(--Text-Color, #051441);
    }
    &_row {
      min-height: 100vh;
      padding-top: 15rem;
      padding-bottom: 8rem;
    }

    &_tabs-content {
      width: 77rem;
      min-height: 65rem;
      padding: 3rem;
      background-color: #f2f2f2;
      font-family: Roboto;
      display: flex;
      flex-direction: column;
      border-radius: 2rem;
      color: #051441;
      @include font(2rem, 2.4rem, '', 400);
      letter-spacing: -0.8px;

      &.term {
        padding-right: 2rem;
      }
      &.prro {
        padding-right: 5rem;
        .questions_text {
          &:first-child,
          &:nth-child(5),
          &:nth-child(19) {
            font-weight: 700;
          }

          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(9),
          &:nth-child(10),
          &:nth-child(15),
          &:nth-child(18) {
            margin-bottom: 3rem;
          }
        }
      }
      &.work {
        padding-right: 6rem;
        .questions_text {
          &:first-child,
          &:nth-child(2),
          &:nth-child(5),
          &:nth-child(6),
          &:nth-child(7) {
            margin-bottom: 3rem;
          }
        }
      }

      &.energy {
        padding-right: 6rem;
        .questions_text {
          &:first-child,
          &:nth-child(2),
          &:nth-child(3),
          &:last-child {
            margin-bottom: 3rem;
          }
          &:first-child,
          &:nth-child(3) {
            font-weight: 700;
          }
        }
      }
      ul {
        list-style: disc;
        padding-left: 2rem;
      }
    }
    &_tabs-content_title {
      font-weight: 600;
    }
  }

  @include media('max', 'md') {
    .questions {
      &_tabs-content {
        @include font(1.8rem, 2.2rem, '', 400);
        margin-top: 2rem;
        width: 100%;
        &.term,
        &.prro,
        &.work,
        &.energy {
          .questions_text {
            &:first-child,
            &:nth-child(2),
            &:nth-child(3),
            &:nth-child(4),
            &:nth-child(5),
            &:nth-child(6),
            &:nth-child(7),
            &:nth-child(9),
            &:nth-child(10),
            &:nth-child(15),
            &:nth-child(18) {
              margin-bottom: 2rem;
            }
          }
        }
      }
    }
  }

  @include media('max', 'sm') {
    .questions {
      &_title {
        color: #051441;
        @include font(2.5rem, 2.5rem, '', 500);
        width: 100%;
        margin-bottom: 2rem;
        color: var(--Text-Color, #051441);
      }
      &_row {
        min-height: auto;
        padding-top: 7rem;
        padding-bottom: 8rem;
      }
      &_tabs-content {
        @include font(1.3rem, 1.8rem, '', 400);
        padding: 2rem;
        &.term,
        &.prro,
        &.work,
        &.energy {
          .questions_text {
            &:first-child,
            &:nth-child(2),
            &:nth-child(3),
            &:nth-child(4),
            &:nth-child(5),
            &:nth-child(6),
            &:nth-child(7),
            &:nth-child(9),
            &:nth-child(10),
            &:nth-child(15),
            &:nth-child(18) {
              margin-bottom: 1rem;
            }
          }
        }
      }
    }
  }
</style>
