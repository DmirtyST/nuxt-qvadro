<template>
  <section id="about" class="about-company">
    <UiContainer width="125">
      <div class="about-company_titles">
        <div class="about-company_title">
          <UiHeading size="lg">{{ $t('about.title') }} </UiHeading>
        </div>
        <div class="about-company_sub">
          <UiTypography size="md">
            <span>{{ $t('about.sub') }} </span>
          </UiTypography>
        </div>
      </div>
      <div class="about-company_row">
        <div class="about-company_accordions">
          <div
            v-for="(item, index) in aboutData"
            :key="item.id"
            class="about-company_accordion"
            :class="{active: item.isOpen}"
          >
            <UiAccordion
              v-model="item.isOpen"
              :default-open="item.defaultOpen"
              section="about"
            >
              <template v-slot:title>
                <div class="about-company_accordion-title">
                  <div class="about-company_accordion-icon">
                    <Icon :icon="item.icon" />
                  </div>
                  <div class="about-company_accordion-head">
                    {{ $t(item.title) }}
                  </div>
                </div>
              </template>
              <div class="about-company_accordion-content">
                {{ $t(item.desc) }}
              </div>
            </UiAccordion>
          </div>
        </div>
        <div class="about-company_content">
          <nuxt-img
            quality="100"
            loading="lazy"
            format="webp"
            provider="cloudinary"
            src="aboutRight.png"
            class="about-company_img"
            alt="image"
          />
          <ul class="about-company_lists">
            <li class="about-company_list" v-for="item in abouDataList" :key="item.id">
              <div class="about-company_lists-img">
                <nuxt-img
                  v-if="locale === 'ru'"
                  quality="100"
                  loading="lazy"
                  format="webp"
                  provider="cloudinary"
                  :src="item.srcRu"
                  alt="image"
                />

                <nuxt-img
                  v-else
                  quality="100"
                  loading="lazy"
                  format="webp"
                  provider="cloudinary"
                  :src="item.srcUa"
                  alt="image"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<script setup>
  import {Icon} from '@iconify/vue';
  import {useI18n} from 'vue-i18n';
  const {locale} = useI18n();
  const abouDataList = [
    {id: 1, srcRu: 'aboutRightList1.png', srcUa: 'aboutRightList1.png'},
    {id: 2, srcRu: 'aboutRightList2RU.png', srcUa: 'aboutRightList2Ua.png'},
    {id: 3, srcRu: 'aboutRightList3Ru.png', srcUa: 'aboutRightList3Ua.png'},
  ];
  const aboutData = reactive([
    {
      id: 1,
      title: 'about.accordion[0].title',
      desc: 'about.accordion[0].desc',
      icon: 'mdi:users-group',
      defaultOpen: true,
      isOpen: false,
    },
    {
      id: 2,
      title: 'about.accordion[1].title',
      desc: 'about.accordion[1].desc',
      icon: 'radix-icons:rocket',
      defaultOpen: false,
      isOpen: false,
    },
    {
      id: 3,
      title: 'about.accordion[2].title',
      desc: 'about.accordion[2].desc',
      icon: 'solar:star-linear',

      defaultOpen: false,
      isOpen: false,
    },
    {
      id: 4,
      title: 'about.accordion[3].title',
      desc: 'about.accordion[3].desc',
      icon: 'nonicons:loading-16',
      defaultOpen: false,
      isOpen: false,
    },
  ]);
</script>

<style lang="scss" scoped>
  .about-company {
    padding-top: 5rem;
    padding-bottom: 2rem;
    background-color: $gray;
    &_titles {
      margin: 0 auto;
      text-align: center;
      width: 98.5rem;
    }

    &_title {
      margin-bottom: 1rem;
    }

    &_sub {
      margin-bottom: 5rem;
      span {
        line-height: 2.4rem;
      }
    }

    &_row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &_accordion {
      display: block;
      height: auto;
      width: 60rem;
      border-bottom: 0.1rem solid rgba(#a6a6a6, 0.5);
      transition: all ease 0.4s;
      &.active {
        transition: all ease 0.4s;
        background-color: $white;

        .about-company_accordion-icon,
        .about-company_accordion-head {
          color: $blueLight;
          transition: all ease 0.4s;
        }
      }
    }
    &_accordion-title {
      @include font(2.4rem, 2.8rem, '', 500);
      padding-top: 2.8rem;
      padding-bottom: 2.4rem;
      @include flex(row, '', center);
      width: 60rem;
      cursor: pointer;
      transition: all ease 0.4s;
    }
    &_accordion-icon {
      @include font(3rem, 2.4rem, '', 500);
      width: 6.8rem;
    }
    &_accordion-head,
    &_accordion-icon {
      transition: all ease 0.4s;
    }
    &_accordion-content {
      padding-left: 6.8rem;
      padding-bottom: 2rem;
      padding-right: 1rem;
      @include font(1.8rem, 2.2rem, '', 400);
    }
    &_img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
    }
    &_content {
      width: 47rem;
      height: 50rem;
      display: flex;
      align-items: center;
      position: relative;
      top: 5rem;
    }

    &_lists {
      top: 0;
      left: 0;
      width: 55rem;
      height: 50rem;
      position: relative;
      z-index: 22;
      padding-top: 4.4rem;
    }
    &_list {
      position: absolute;
      &:first-child {
        left: -2rem;
        top: 0rem;
        .about-company_lists-img {
          width: 21rem;
          height: 21rem;
        }
      }
      &:nth-child(even) {
        right: 2rem;
        top: 30%;
        transform: translateY(-50%);
        .about-company_lists-img {
          width: 21rem;
          height: 23rem;
        }
      }
      &:last-child {
        bottom: 10rem;
        left: -5rem;
        .about-company_lists-img {
          width: 32rem;
          height: 10rem;
        }
      }
    }
    &_lists-img {
      img {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
      }
    }
  }

  @include media('max', 'md') {
    .about-company {
      padding-bottom: 5rem;
      &_titles {
        width: auto;
        padding: 0 1rem;
      }

      &_content {
        display: none;
      }

      &_accordion {
        width: 100%;
      }
    }
  }

  @include media('max', 'sm') {
    .about-company {
      padding-bottom: 5rem;
      &_titles {
        width: auto;
        padding: 0 1rem;
      }
      &_accordion-title {
        @include font(1.5rem, 1.7rem, '', 500);
        padding-top: 2rem;
        padding-bottom: 2rem;
        gap: 1rem;
        width: 100%;
      }
      &_accordion-content {
        padding-left: 4rem;
        padding-bottom: 2rem;
        padding-right: 1rem;
        @include font(1.3rem, 1.9rem, '', 400);
      }
      &_accordion-icon {
        @include font(1.7rem, 1.7rem, '', 500);
        width: 3rem;
      }
      &_content {
        display: none;
      }

      &_accordion {
        width: 100%;
      }
    }
  }
</style>
