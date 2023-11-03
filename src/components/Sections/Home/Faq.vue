<template>
  <section id="faq" class="faq">
    <UiContainer width="125">
      <div class="faq_row">
        <div class="faq_titles">
          <div class="faq_title">{{ $t('faq.title') }}</div>
          <div class="faq_sub">
            {{ $t('faq.sub') }}
            <a href="#footer">{{ $t('faq.contactsLink') }} </a>
          </div>
        </div>
        <div class="faq_accordions">
          <div
            v-for="item in faqData"
            :key="item.id"
            class="faq_accordion"
            :class="{active: item.isOpen}"
          >
            <UiAccordion
              v-model="item.isOpen"
              :default-open="item.defaultOpen"
              section="faq"
            >
              <template v-slot:title>
                <div class="faq_accordion-title">
                  <div class="faq_accordion-head">{{ $t(item.title) }}</div>
                  <div class="faq_accordion-icon">
                    <Icon icon="formkit:down" :rotate="2" />
                  </div>
                </div>
              </template>
              <div class="faq_accordion-content">
                {{ $t(item.desc) }}
              </div>
            </UiAccordion>
          </div>
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<script setup>
  import {Icon} from '@iconify/vue';

  const faqData = reactive([
    {
      id: 1,
      title: 'faq.accordion[0].title',
      desc: 'faq.accordion[0].desc',
      defaultOpen: false,
      isOpen: false,
    },
    {
      id: 2,
      title: 'faq.accordion[1].title',
      desc: 'faq.accordion[1].desc',
      defaultOpen: false,
      isOpen: false,
    },
    {
      id: 3,
      title: 'faq.accordion[2].title',
      desc: 'faq.accordion[2].desc',
      defaultOpen: false,
      isOpen: false,
    },
    {
      id: 4,
      title: 'faq.accordion[3].title',
      desc: 'faq.accordion[3].desc',
      defaultOpen: false,
      isOpen: false,
    },
  ]);
</script>

<style lang="scss" scoped>
  .faq {
    padding-top: 5rem;
    padding-bottom: 5rem;
    &_row {
      display: flex;
      justify-content: space-between;
    }

    &_titles {
      width: 40rem;
    }

    &_title {
      @include font(4rem, 4rem, '', 500);
      margin-bottom: 2.5rem;
    }

    &_sub {
      color: #a6a6a6;
      @include font(1.8rem, 2.4rem, '', 500);
      a {
        color: $blueLight;
      }
    }

    &_accordions {
      width: 70rem;
    }

    &_accordion-icon {
      font-size: 1.3rem;
      transition: all ease 0.4s;
    }

    &_accordion {
      padding-left: 2.4rem;
      padding-right: 1rem;
      transition: all ease 0.4s;
      border-bottom: 0.1rem solid rgba(#a6a6a6, 0.5);
      &.active {
        background-color: transparent;
        box-shadow: 0px 8px 12px 0px rgba(5, 20, 65, 0.15);
        border-bottom: transparent;
        transition: all ease 0.4s;
        .faq_accordion-head {
          color: $blueLight;
          transition: all ease 0.4s;
        }

        .faq_accordion-icon {
          color: $blueLight;
          transform: rotate(180deg);
          transition: all ease 0.4s;
        }
      }
    }
    &_accordion-title {
      width: 65rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &_accordion-head {
      @include font(2.4rem, 2.8rem, '', 500);
      text-align: start;
      width: 52rem;
      padding: 3.2rem 0;
      transition: all ease 0.4s;
    }

    &_accordion-content {
      @include font(1.6rem, 2.4rem, '', 400);
      padding-bottom: 3.4rem;
    }
  }

  @include media('max', 'md') {
    .faq {
      &_row {
        display: block;
      }
      &_titles {
        width: 100%;
        margin-bottom: 2.5rem;
      }

      &_title {
        @include font(4rem, 4rem, '', 500);
        margin-bottom: 1rem;
      }
      &_accordions {
        width: 100%;
      }
    }
  }

  @include media('max', 'sm') {
    .faq {
      &_titles {
        width: 100%;
        margin-bottom: 2rem;
      }
      &_accordion-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 1rem;
      }
      &_sub {
        color: #a6a6a6;
        @include font(1.5rem, 2.4rem, '', 500);
      }
      &_accordion {
        padding-left: 0rem;
        padding-right: 0rem;

        .faq_accordion-icon {
          @include font(0.7rem, 1rem, '', 500);
          padding-right: 0rem;
        }
      }
      &_title {
        @include font(2.5rem, 3rem, '', 500);
        margin-bottom: 1rem;
      }
      &_accordion-head {
        @include font(1.5rem, 2.3rem, '', 500);
        width: 80%;
        padding: 1rem 1rem;
        transition: all ease 0.4s;
      }

      &_accordion-content {
        @include font(1.3rem, 2.2rem, '', 400);
        padding-bottom: 2.4rem;
        padding: 1rem;
      }
    }
  }
</style>
