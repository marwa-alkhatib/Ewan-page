// ======================================================
// SECTION 6
// خدمات للأفراد
// ======================================================

const section6 = document.querySelector(".section6");

const section6Items = section6.querySelectorAll(".gallery-item");
const section6Prev = section6.querySelector(".nav-prev");
const section6Next = section6.querySelector(".nav-next");

// رقم الصورة الحالية داخل كل مكان
let section6Current = [0, 0, 0];

// المكان اللي هيتغير في الضغطة الحالية
let section6Box = 0;


// ======================================================
// تحديد المقاسات
// ======================================================

function isMobile() {
  return window.innerWidth <= 767;
}

function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth <= 991;
}


// ======================================================
// تحريك صور SECTION 6
// ======================================================

function moveSection6(direction) {

    // في التابلت نتعامل مع أول كارتين فقط
    let availableItems;

    if (isTablet()) {
        availableItems = Array.from(section6Items).slice(0, 2);
    } else {
        availableItems = Array.from(section6Items);
    }


    // لو كنا جايين من الديسكتوب وكان المؤشر واقف على الكارت الثالث
    // نرجعه لأول كارت في التابلت
    if (section6Box >= availableItems.length) {
        section6Box = 0;
    }


    const item = availableItems[section6Box];

    const slides = item.querySelectorAll(".slide");


    // نخفي الصورة الحالية
    slides[
        section6Current[section6Box]
    ].classList.remove("active");


    // نحدد الصورة الجديدة
    section6Current[section6Box] =
        (
            section6Current[section6Box]
            + direction
            + slides.length
        ) % slides.length;


    // نظهر الصورة الجديدة
    slides[
        section6Current[section6Box]
    ].classList.add("active");


    // ننتقل للكارت التالي
    // في التابلت: بين الكارت الأول والثاني فقط
    // في الديسكتوب: بين الثلاث كروت
    section6Box =
        (
            section6Box
            + direction
            + availableItems.length
        ) % availableItems.length;
}


// ======================================================
// SECTION 6 - MOBILE
// كارت واحد بس ظاهر، السهم بينقل للكارت التالي
// ======================================================

const section6Cols = Array.from(section6Items).map((item) =>
  item.closest("[class*='col-']")
);

let section6MobileIndex = 0;


function updateSection6MobileView() {

  // لو مش موبايل رجع عرض الكروت لطبيعته
  if (!isMobile()) {

    section6Cols.forEach((col) => {
      col.style.display = "";
    });

    return;
  }


  // في الموبايل نظهر كارت واحد فقط
  section6Cols.forEach((col, i) => {

    col.style.display =
      i === section6MobileIndex
        ? "block"
        : "none";

  });
}


// أول تحميل
updateSection6MobileView();


// كل ما حجم الشاشة يتغير
window.addEventListener(
  "resize",
  updateSection6MobileView
);


// ======================================================
// أسهم SECTION 6
// ======================================================

// سهم
section6Next.addEventListener("click", function () {

    if (isMobile()) {

        section6MobileIndex =
            (section6MobileIndex + 1)
            % section6Cols.length;

        updateSection6MobileView();

    } else {

        moveSection6(1);

    }

});


// السهم الآخر
section6Prev.addEventListener("click", function () {

    if (isMobile()) {

        section6MobileIndex =
            (
                section6MobileIndex
                - 1
                + section6Cols.length
            )
            % section6Cols.length;

        updateSection6MobileView();

    } else {

        moveSection6(-1);

    }

});





// ======================================================
// SECTION 7
// الجاليري اللي فيه العناوين تحت الصور
// ======================================================

const section7 = document.querySelector(".section7");

const section7Scroll = section7.querySelector(".gallery-scroll");

const section7Prev = section7.querySelector(".nav-prev");

const section7Next = section7.querySelector(".nav-next");


function moveSection7(direction) {

    // ناخد كارت واحد علشان نعرف عرضه
    const card = section7Scroll.querySelector(".gallery-col");

    // المسافة الموجودة بين الكروت
    const gap =
        parseFloat(getComputedStyle(section7Scroll).gap) || 0;

    // مقدار الحركة = عرض كارت واحد + المسافة
    const amount =
        card.getBoundingClientRect().width + gap;

    // الوقت اللي عايزه للانتقال (بالميلي ثانية)
    const duration = 800;

    const start = section7Scroll.scrollLeft;

    const target =
        start + (direction * amount);

    const startTime =
        performance.now();


    function animateScroll(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        // حركة بنفس المقدار طول الوقت
        section7Scroll.scrollLeft =
            start
            + (target - start)
            * progress;


        if (progress < 1) {

            requestAnimationFrame(
                animateScroll
            );

        }

    }


    requestAnimationFrame(
        animateScroll
    );

}


// سهم
section7Next.addEventListener("click", function () {

    moveSection7(-1);

});


// السهم الآخر
section7Prev.addEventListener("click", function () {

    moveSection7(1);

});





// ======================================================
// HAMBURGER MENU + DROPDOWNS
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

  const hamburgerBtn =
    document.querySelector(".mobileImg");

  const section3 =
    document.querySelector(".section3");


  // فتح وقفل القائمة في الموبايل
  if (hamburgerBtn && section3) {

    hamburgerBtn.addEventListener("click", function () {

      section3.classList.toggle("active");

    });

  }


  // القوائم المنسدلة
  const dropdownParents =
    document.querySelectorAll(
      ".section3 nav > ul > li"
    );


  dropdownParents.forEach(function (li) {

    const link =
      li.querySelector(".liLinks");

    const dropdown =
      li.querySelector(".dropDownMenu");


    if (dropdown && link) {

      link.addEventListener("click", function (e) {

        // موبايل فقط
        if (window.innerWidth <= 768) {

          e.preventDefault();

          li.classList.toggle("open");

        }

      });

    }

  });

});