ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.75846201917052,37.601120686508075],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 14.3
      });

      var myPlacemark = new ymaps.Placemark([55.75846201917052,37.601120686508075], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/group68.svg',
        iconImageSize: [20, 20],
        iconImageOffset: [-3, -42]
      });
      myMap.geoObjects.add(myPlacemark);
    }
