import '../style.scss';

/**
 * @file
 * Global utilities.
 */
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


(function (Drupal) {
  'use strict';

  Drupal.behaviors.itcCarousel = {
    attach: function (context, settings) {
      const wrappers = context.querySelectorAll('.js-carousel-wrapper:not(.processed)');

      wrappers.forEach(wrapper => {
        wrapper.classList.add('processed');

        const swiperEl = wrapper.querySelector('.swiper');
        const prevBtn = wrapper.querySelector('.js-carousel-prev');
        const nextBtn = wrapper.querySelector('.js-carousel-next');

        if (!swiperEl) { return;
        }

        new Swiper(swiperEl, {
          modules: [Navigation],

          loop: true,
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 500,
          grabCursor: true,

          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
          },

          preventClicks: true,
          preventClicksPropagation: true,
        });
      });
    }
  };

  // === Header Logic (Language Switcher) ===
  Drupal.behaviors.itcHeader = {
    attach: function (context, settings) {
      // Find all language toggles (although usually there is only one)
      const switchers = context.querySelectorAll('.block-language-switcher:not(.processed)');

      switchers.forEach(switcher => {
        switcher.classList.add('processed');

        const toggleBtn = switcher.querySelector('.js-lang-toggle');
        const dropdown = switcher.querySelector('.js-lang-dropdown');
        const arrow = switcher.querySelector('.js-lang-arrow');
        const currentLangText = switcher.querySelector('.js-current-lang-text');

        const activeLink = switcher.querySelector('.lang-list-wrapper .is-active');
        if (activeLink) {
          let langCode = activeLink.textContent.trim().substring(0, 2).toUpperCase();

          if (langCode === 'SI') { langCode = 'CN';
          }
          currentLangText.textContent = langCode;
        }

        if (toggleBtn && dropdown) {
          toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            arrow.classList.toggle('rotate-180');
          });

          document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
              dropdown.classList.remove('active');
              arrow.classList.remove('rotate-180');
            }
          });
        }
      });
    }
  };

})(Drupal);
