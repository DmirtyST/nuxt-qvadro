<template>
  <div id="footer" class="footer">
    <UiContainer width="125">
      <div class="footer_row">
        <div class="footer_left">
          <NuxtLink to="/">
            <div @click="scrollToTop" class="footer_left-logo">
              <nuxt-img
                quality="100"
                loading="lazy"
                format="webp"
                provider="cloudinary"
                src="qvadro-logo.png"
                alt="logo"
              />
            </div>
          </NuxtLink>
          <div class="footer_left-sub">{{ $t('footer.adress[0]') }}</div>
          <ul class="footer_left-adress">
            <li>
              <a href="https://goo.gl/maps/oxHrEToaMjvCznndA">
                {{ $t('footer.adress[1]') }}
                <p>{{ $t('footer.adress[2]') }}</p>
              </a>
            </li>
            <li>{{ $t('footer.trade') }}</li>
            <li><a href="tel:0503474312">+38 (050) 347-43-12</a></li>
            <li><a href="mailto:0503474312@ukr.net">0503474312@ukr.net</a></li>
            <li>{{ $t('footer.sup[0]') }}</li>
            <li><a href="tel:0637096953">+38 (063) 709-69-53</a></li>
            <li><a href="tel:0982005546">+38 (098) 200-55-46</a></li>
          </ul>
        </div>
        <div class="footer_lists">
          <ul class="footer_list">
            <li class="footer_list-title">{{ $t('footer.listTitle[0]') }}</li>
            <li v-for="item in footerListData[0]" class="footer_list-item">
              <NuxtLink :to="item.path"> {{ $t(item.title) }}</NuxtLink>
            </li>
          </ul>
          <ul class="footer_list">
            <li class="footer_list-title">{{ $t('footer.listTitle[1]') }}</li>

            <li v-for="item in footerListData[1]" class="footer_list-item">
              <div @click="() => handleDivClick(item.path)">
                <NuxtLink :to="item.path"> {{ $t(item.title) }}</NuxtLink>
              </div>
            </li>
          </ul>
          <ul class="footer_list">
            <li class="footer_list-title">{{ $t('footer.listTitle[2]') }}</li>
            <li v-for="item in footerListData[2]" class="footer_list-item">
              <div @click="() => handleDivClick(item.path)">
                <NuxtLink :to="item.path"> {{ $t(item.title) }}</NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </UiContainer>
    <div class="footer_sub">
      {{ $t('footer.footerSub') }}
    </div>
  </div>
</template>

<script setup>
  import {useRoute} from 'vue-router';

  const route = useRoute();
  const footerListData = [
    [
      {title: 'footer.categories.title[0]', path: '/products/vending_machine-floor'},
      {
        title: 'footer.categories.title[1]',
        path: '/products/osmos_purification-system',
      },
      {
        title: 'footer.categories.title[2]',
        path: '/products/vending_machine-wall-mounted',
      },
      {title: 'footer.categories.title[3]', path: '/products/vending_machine-built-in'},
    ],
    [{title: 'footer.categories.title[4]', path: '/questions/technical'}],
    [
      {title: 'footer.categories.title[5]', path: '/questions/technical'},
      {title: 'footer.categories.title[6]', path: '/questions/details'},
      {title: 'footer.categories.title[7]', path: '/questions/time-work'},
    ],
  ];
  const handleDivClick = (path) => {
    // Объедините все пути из footerListData в один массив
    const allPaths = footerListData.flat().map((item) => item.path);

    // Проверьте, находится ли текущий путь в этом массиве
    if (allPaths.includes(route.path) && route.path === path) {
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
</script>

<style lang="scss" scoped>
  .footer {
    background-color: #bcddfe;

    &_row {
      display: flex;
      justify-content: space-around;
      padding-top: 5rem;
      padding-bottom: 4.5rem;
    }

    &_left {
      width: 32rem;
    }

    &_left-logo {
      cursor: pointer;
      width: 14.2rem;
      height: 3.7rem;
      margin-bottom: 2rem;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    &_left-sub {
      color: #52525b;
      @include font(1.4rem, 1.4rem, '', 400);
      margin-bottom: 5rem;
    }

    &_left-adress,
    &_left-adress a {
      @include font(1.6rem, 2.7rem, '', 400);
      color: #051441;
      font-family: 'Roboto';
    }
    &_left-adress,
    &_left-adress li {
      @include font(1.6rem, 2.7rem, '', 700);
      color: #051441;
      font-family: 'Roboto';
      &:first-child {
        a {
          @include font(1.6rem, 2.7rem, '', 700);
          p {
            @include font(1.6rem, 2.7rem, '', 400);
          }
        }
      }
      &:first-child,
      &:nth-child(4) {
        margin-bottom: 1rem;
      }
    }
    &_lists {
      width: 74rem;
      display: flex;
      justify-content: space-between;
      color: #211818;
    }

    &_list {
      width: 18rem;
    }

    &_list-title {
      margin-bottom: 3.5rem;
      @include font(1.6rem, 1.6rem, '', 700);
    }

    &_list-item {
      margin-bottom: 3.5rem;
      a {
        @include font(1.4rem, 2.2rem, '', 400);

        color: #262626;
      }
    }

    &_sub {
      text-align: center;
      padding: 2rem 1.5rem;
      border-top: 0.1rem solid $white;
      @include font(1.4rem, 1.4rem, '', 300);
      color: #4f2424;
      font-family: 'Roboto';
    }
  }

  @include media('max', 'md') {
    .footer {
      &_left {
        width: 32rem;
        margin-bottom: 3rem;
      }
      &_row {
        display: grid;
      }
      &_left-logo {
        width: 12.2rem;
        height: 3.7rem;
        margin-bottom: 2rem;
      }
      &_lists {
        width: 74rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }

      &_list {
        width: 17rem;
      }
      &_left-sub {
        color: #52525b;
        @include font(1.3rem, 1.3rem, '', 400);
        margin-bottom: 3rem;
      }
    }
  }

  @include media('max', 'sm') {
    .footer {
      &_left {
        width: 32rem;
        margin-bottom: 4rem;
      }
      &_row {
        display: grid;
      }
      &_left-logo {
        width: 12.2rem;
        height: 3.7rem;
        margin-bottom: 2rem;
      }
      &_lists {
        width: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      &_list {
        width: 100%;
      }
      &_left-sub {
        @include font(1.3rem, 1.3rem, '', 400);
        margin-bottom: 2rem;
      }

      &_list-item {
        margin-bottom: 1.5rem;

        a {
          @include font(1.4rem, 2.2rem, '', 400);

          color: #262626;
        }
      }
      &_list-title {
        margin-bottom: 2rem;
        @include font(1.6rem, 1.6rem, '', 700);
      }
    }
  }
</style>
