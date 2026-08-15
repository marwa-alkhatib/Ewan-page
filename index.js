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


function moveSection6(direction) {

    const item = section6Items[section6Box];

    const slides = item.querySelectorAll(".slide");

    // نخفي الصورة الحالية
    slides[section6Current[section6Box]].classList.remove("active");

    // نحدد الصورة الجديدة
    section6Current[section6Box] =
        (section6Current[section6Box] + direction + slides.length)
        % slides.length;

    // نظهر الصورة الجديدة
    slides[section6Current[section6Box]].classList.add("active");

    // ننتقل للمكان التالي
    section6Box =
        (section6Box + direction + section6Items.length)
        % section6Items.length;
}


// سهم
section6Next.addEventListener("click", function () {
    moveSection6(1);
});


// السهم الآخر
section6Prev.addEventListener("click", function () {
    moveSection6(-1);
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

    // ✅ الوقت اللي عايزه للانتقال (بالميلي ثانية)
    const duration = 800; // زوّد أو قلل الرقم ده براحتك

    const start = section7Scroll.scrollLeft;
    const target = start + (direction * amount);
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // حركة بنفس المقدار طول الوقت (من غير تسريع أو إبطاء)
        section7Scroll.scrollLeft =
            start + (target - start) * progress;

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}


// سهم
section7Next.addEventListener("click", function () {
    moveSection7(-1);
});


// السهم الآخر
section7Prev.addEventListener("click", function () {
    moveSection7(1);
});