// DOM元素选择
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const fadeElements = document.querySelectorAll('.highlight-card, .feature-item, .content-card');
const navItems = document.querySelectorAll('.nav-links a');
const scrollToTopBtn = document.getElementById('scroll-to-top');

// 移动菜单切换功能
function toggleMobileMenu() {
    if (navLinks) {
        navLinks.classList.toggle('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.toggle('active');
        }
    }
}

// 导航栏滚动效果
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// 平滑滚动功能
function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80, // 减去导航栏高度
            behavior: 'smooth'
        });
    }
}

// 滚动到顶部按钮
function toggleScrollToTopBtn() {
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
}

// 滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 检测元素是否在视口中
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// 淡入动画
function animateOnScroll() {
    fadeElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated', 'fade-in');
        }
    });
}

// 导航项激活状态更新
function updateActiveNavItem() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// 页面加载完成时的初始化
function init() {
    // 绑定事件监听器
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // 为导航链接添加平滑滚动
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScroll(targetId);
                
                // 如果移动菜单打开，则关闭它
                if (navLinks && navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // 为滚动到顶部按钮添加事件
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        toggleScrollToTopBtn();
        animateOnScroll();
        updateActiveNavItem();
    });
    
    // 初始检查
    handleNavbarScroll();
    toggleScrollToTopBtn();
    animateOnScroll();
    updateActiveNavItem();
    
    // 添加简单的加载动画移除
    document.body.classList.add('loaded');
}

// 当DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// 添加额外的CSS以支持JavaScript功能
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* 移动菜单样式 */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background-color: var(--dark-surface);
            flex-direction: column;
            align-items: center;
            padding: var(--spacing-md) 0;
            gap: var(--spacing-sm);
            box-shadow: var(--shadow-md);
            transform: translateY(-150%);
            transition: transform var(--transition-normal);
            z-index: 999;
            opacity: 0;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .mobile-menu.active .menu-btn::before {
            transform: rotate(45deg);
            top: 50%;
        }
        
        .mobile-menu.active .menu-btn::after {
            transform: rotate(-45deg);
            top: 50%;
        }
        
        .mobile-menu.active .menu-btn span {
            opacity: 0;
        }
    }
    
    /* 导航栏滚动效果 */
    .navbar.scrolled {
        box-shadow: var(--shadow-md);
        padding: var(--spacing-xs) 0;
    }
    
    /* 滚动到顶部按钮 */
    #scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-normal);
        box-shadow: var(--shadow-md);
        z-index: 999;
    }
    
    #scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    #scroll-to-top:hover {
        background-color: var(--secondary-color);
        transform: translateY(-3px);
    }
    
    /* 淡入动画效果 */
    .highlight-card, .feature-item, .content-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity var(--transition-slow), transform var(--transition-slow);
    }
    
    .highlight-card.animated, .feature-item.animated, .content-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* 交错延迟动画 */
    .highlight-card:nth-child(1) {
        transition-delay: 0.1s;
    }
    
    .highlight-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .highlight-card:nth-child(3) {
        transition-delay: 0.3s;
    }
    
    .feature-item:nth-child(1) {
        transition-delay: 0.1s;
    }
    
    .feature-item:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .feature-item:nth-child(3) {
        transition-delay: 0.3s;
    }
    
    /* 页面加载动画 */
    body {
        overflow-x: hidden;
    }
    
    body.loaded {
        overflow-x: visible;
    }
`;
document.head.appendChild(styleSheet);

// 添加滚动到顶部按钮到DOM
if (!scrollToTopBtn) {
    const scrollBtn = document.createElement('div');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    document.body.appendChild(scrollBtn);
    
    // 重新获取元素并绑定事件
    document.getElementById('scroll-to-top').addEventListener('click', scrollToTop);
}