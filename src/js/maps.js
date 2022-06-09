ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76045540677451,37.61475447613527],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 13.3
      });

      var myPlacemark = new ymaps.Placemark([55.76677091515023,37.63878531749671], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/group68.svg',
        iconImageSize: [15, 15],
        iconImageOffset: [-3, -42]
      });
      myMap.geoObjects.add(myPlacemark);
    }
    ymaps.domEvent.manager
    .add(myPlacemark, 'click', function (event) {
      const path = event.currentTarget.dataset.path
      document.querySelectorAll('.section-contact__grid-hidden').forEach(function(mapContent) {
        mapContent.classList.remove('section-contact__active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('section-contact__active')
    });
