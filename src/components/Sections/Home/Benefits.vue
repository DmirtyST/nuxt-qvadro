<template>
  <section id="benefits" class="benefits">
    <UiContainer width="125">
      <div class="benefits_titles">
        <div class="benefits_title">
          <UiHeading size="lg">{{ $t('benefits.title') }} </UiHeading>
        </div>
        <div class="benefits_sub">
          <UiTypography size="md">
            <span> {{ $t('benefits.sub') }}</span></UiTypography
          >
        </div>
      </div>
      <div class="benefits_row">
        <div class="benefits_tabs">
          <UiTabsWrapper :names="tabs">
            <template v-slot:default="{selectedTab}">
              <div
                :class="[
                  'benefits_tabs-row',
                  getTabIndex(selectedTab) === tabs.length - 1
                    ? ''
                    : getTabIndex(selectedTab) % 2 === 1
                    ? 'reverse'
                    : '',
                ]"
                :key="selectedTab"
              >
                <div class="benefits_tabs-item">
                  <div class="benefits_tabs-title">
                    {{ $t(tabContents[selectedTab].title) }}
                  </div>
                  <div class="benefits_tabs-description">
                    {{ $t(tabContents[selectedTab].description) }}
                  </div>
                </div>
                <div class="benefits_tabs-img">
                  <nuxt-img
                    quality="100"
                    loading="lazy"
                    format="webp"
                    provider="cloudinary"
                    :src="tabContents[selectedTab].image"
                    alt="image"
                  />
                </div>
              </div>
            </template>
          </UiTabsWrapper>
        </div>
      </div>
    </UiContainer>
  </section>
</template>

<script setup>
  const tabs = [
    {name: 'Monitoring', label: 'benefits.tabLabel[0]'},
    {name: 'CardPayment', label: 'benefits.tabLabel[1]'},
    {name: 'SmartphonePayment', label: 'benefits.tabLabel[2]'},
    {name: 'ProgramERO', label: 'benefits.tabLabel[3]'},
  ];
  const getTabIndex = (name) => {
    return tabs.findIndex((tab) => tab.name === name);
  };
  const tabContents = {
    Monitoring: {
      title: 'benefits.tabMonitoring.title',
      description: 'benefits.tabMonitoring.description',
      image: 'benefits1.png',
    },
    CardPayment: {
      title: 'benefits.tabCardPayment.title',
      description: 'benefits.tabCardPayment.description',
      image: 'benefits2.png',
    },
    SmartphonePayment: {
      title: 'benefits.tabSmartphonePayment.title',
      description: 'benefits.tabSmartphonePayment.description',
      image: 'benefits3.png',
    },
    ProgramERO: {
      title: 'benefits.tabProgramERO.title',
      description: 'benefits.tabProgramERO.description',
      image: 'benefits4.png',
    },
  };
</script>

<style lang="scss" scoped>
  .benefits {
    padding-top: 5rem;
    padding-bottom: 3rem;
    &_titles {
      text-align: center;
      max-width: 114rem;
      margin: 0 auto;
      margin-bottom: 5rem;
    }

    &_title {
      margin-bottom: 0.7rem;
    }

    &_sub {
      span {
        line-height: 2.4rem;
      }
    }

    &_tabs-row {
      display: flex;

      gap: 1.6rem;
    }

    &_tabs-item {
      width: 50rem;
      color: $white;
    }

    &_tabs-title {
      @include font(2.8rem, 3.3rem, '', 700);
      margin-bottom: 2rem;
    }

    &_tabs-description {
      @include font(1.6rem, 2.4rem, '', 400);
    }

    &_tabs-img {
      width: 35rem;
      height: 35rem;

      img {
        width: auto; // это позволит изображению сохранять свои оригинальные размеры
        height: auto;
        max-width: 100%; // это ограничит максимальную ширину изображения шириной контейнера
        max-height: 100%; // аналогично для высоты
        object-fit: contain;
      }
    }
  }
  .benefits_tabs-row.reverse {
    flex-direction: row-reverse;
  }

  @include media('max', 'md') {
    .benefits {
      &_tabs-title {
        @include font(2.3rem, 3rem, '', 700);
        margin-bottom: 2rem;
      }

      &_tabs-description {
        @include font(1.6rem, 2.4rem, '', 400);
      }
    }
  }

  @include media('max', 'sm') {
    .benefits {
      padding-top: 3rem;
      padding-bottom: 1rem;
      &_titles {
        text-align: center;
        max-width: 100%;
        margin: 0 auto;
        margin-bottom: 2rem;
      }

      &_tabs-img {
        display: none;
      }
      &_tabs-title {
        @include font(1.5rem, 2.4rem, '', 600);
        margin-bottom: 2rem;
      }

      &_tabs-description {
        @include font(1.2rem, 2rem, '', 400);
      }
    }
  }
</style>
