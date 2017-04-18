import * as $ from 'jquery';
import 'jquery.scrollto'; 

export function scrollToAboutHistory() {
  const target = '#about__history';
  const duration = 500;
  const settings = {
    offset: -50,
  };
  $.scrollTo(target, duration, settings);
  $('.home__desktop-below-header-col-right')
    .scrollTo(target, duration, settings);
}

