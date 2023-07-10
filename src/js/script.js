// const { compile } = require("sass");

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  //////////////
  // topへ戻るボタン
  //////////////
  var topBtn = $(".js-page-top");
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 130) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  $(document).on("click", 'a[href*="#"]', function () {
    let time = 400;
    let header = $(".header__inner").height();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $("html,body").animate({ scrollTop: targetY }, time, "swing");
    return false;
  });

  //////////
  // ハンバーガー
  //////////
  $(function () {
    // ボタンクリックしたら
    $(".js-hamburger").click(function () {
      // アクティブクラスつけ外し
      $(this).toggleClass("active");
      // ナビ表示
      $(".js-nav").toggleClass("panelactive");

      // ヘッダーの色黒にする
      $(".header").toggleClass("active");
      // bodyに「.active」class付け外し　背景固定
      $("body").toggleClass("active");
    });

    // リンククリックしたら
    $(".js-nav a").click(function () {
      // アクティブクラス外す
      $(".js-hamburger").removeClass("active");
      // ナビ表示
      $(".js-nav").removeClass("panelactive");
      // ヘッダーの色透明にする
      $(".header").removeClass("active");
      // bodyに「.active」class付け外し　背景固定解除
      $("body").removeClass("active");
    });
  });

  ////////////////
  //   ヘッダー　mv過ぎたら変色
  ////////////////

  let header = $(".header");
  let headerHeight = $(".header").height();
  let height = $(".js-mv-height").height();

  $(window).scroll(function () {
    if ($(this).scrollTop() > height - headerHeight) {
      // 指定px以上のスクロールでヘッダーを表示
      header.addClass("is-color");
    } else {
      // 画面が指定pxより上ならヘッダーを非表示
      header.removeClass("is-color");
    }
  });

  ////////////////
  //   メインビュー
  ////////////////

  let swipeOption = {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
  };
  new Swiper(".js-top-mv-swiper", swipeOption);

  ////////////
  // campaignスライダー
  ////////////

  let mySwiper = new Swiper(".top-campaign__swiper", {
    // オプション設定

    // PC時のみページネーション表示
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // autoplay: { // スライドの自動再生
    //   delay: 3000,
    // },

    // width: 334,
    // height: 445,
    loop: true, // スライドの無限ループ

    // スライドの表示枚数：768px未満の場合
    slidesPerView: 1.27,
    spaceBetween: 25,

    breakpoints: {
      // スライドの表示枚数：768px以上の場合
      768: {
        slidesPerView: 3.46,
        spaceBetween: 30,
      },
    },
  });

  let prevButton = document.querySelector(".swiper-button-prev");
  let nextButton = document.querySelector(".swiper-button-next");

  // prevボタンのクリックイベントを監視します
  prevButton.addEventListener("click", function () {
    // 自動再生を再開します
    mySwiper.autoplay.start();
  });
  // nextボタンのクリックイベントを監視します
  nextButton.addEventListener("click", function () {
    // 自動再生を再開します
    mySwiper.autoplay.start();
  });
}); // 消さない
