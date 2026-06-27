/* ============================================
   温迪 · 风神的诗篇 — 交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 导航栏滚动效果
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // 导航栏背景
        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 高亮当前区域对应的导航链接
        const sections = document.querySelectorAll('.section, .hero');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const id = section.getAttribute('id');
            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        lastScroll = currentScroll;
    });

    // ==========================================
    // 移动端菜单
    // ==========================================
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击链接后关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // 回到顶部按钮
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 时间线滚动动画
    // ==========================================
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // ==========================================
    // 名言轮播
    // ==========================================
    const quotes = document.querySelectorAll('.quote-card');
    const dotsContainer = document.getElementById('quoteDots');
    const prevBtn = document.getElementById('quotePrev');
    const nextBtn = document.getElementById('quoteNext');
    let currentQuote = 0;

    // 创建指示点
    quotes.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('quote-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToQuote(index));
        dotsContainer.appendChild(dot);
    });

    function goToQuote(index) {
        quotes.forEach(q => q.classList.remove('active'));
        document.querySelectorAll('.quote-dot').forEach(d => d.classList.remove('active'));

        currentQuote = index;
        quotes[currentQuote].classList.add('active');
        document.querySelectorAll('.quote-dot')[currentQuote].classList.add('active');
    }

    function nextQuote() {
        const next = (currentQuote + 1) % quotes.length;
        goToQuote(next);
    }

    function prevQuote() {
        const prev = (currentQuote - 1 + quotes.length) % quotes.length;
        goToQuote(prev);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevQuote);
        nextBtn.addEventListener('click', nextQuote);
    }

    // 自动播放
    let quoteInterval = setInterval(nextQuote, 5000);

    // 鼠标悬停暂停
    const slider = document.getElementById('quotesSlider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(quoteInterval));
        slider.addEventListener('mouseleave', () => {
            quoteInterval = setInterval(nextQuote, 5000);
        });
    }

    // ==========================================
    // 键盘导航
    // ==========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevQuote();
        if (e.key === 'ArrowRight') nextQuote();
    });

    // ==========================================
    // 平滑锚点跳转（降级支持）
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 图库图片懒加载
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('.gallery-item img');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }

    // ==========================================
    // 页面加载完成后的额外动画
    // ==========================================
    document.body.style.animation = 'fadeIn 0.5s ease';

    console.log('🍃 愿风神护佑你，旅行者！');
    console.log('「风带来故事的种子，时间使之发芽。」');
});
