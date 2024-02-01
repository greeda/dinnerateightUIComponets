window.UICommon = window.UICommon || {};


UICommon.Accordion = function (props) {
    let el = null;
    let accordionItem = null;
    let accordionBtn = null;

    function init() {
        render();
        initOpenState();
        bindEvents();
    }

    function initOpenState() {
        if (props.dataset.state === 'allOpen') {
            open('all');
        }
    }

    function render() {
        accordionItem = Array.from(props.children).filter(child =>
            child.classList.contains('accordion-item')
        );

        accordionBtn = accordionItem.map(item =>
            item.querySelector('.accordion-btn')
        );
    }

    function bindEvents() {
        accordionBtn.forEach((item, index) => {
            item.addEventListener('click', (event) => {
                // event.preventDefault();
                if (item.classList.contains('on')) {
                    close(index);
                } else {
                    open(index);
                }
            });
        })

    }

    function open(index) {
        const accordionContent = accordionBtn[index].nextElementSibling;

        // inner accordions
        const innerAccordionHeights = Array.from(accordionContent.querySelectorAll('.accordion-list')).map(el => el.scrollHeight).reduce((total, height) => total + height, 0);
        const totalHeight = accordionContent.scrollHeight + innerAccordionHeights;



        console.log(totalHeight)
        if (index === 'all') {
            accordionBtn.forEach(item => {
                item.classList.add('on');
            });

            return;
        }

        const scrollHeight = accordionBtn[index].nextElementSibling.scrollHeight;

        if (props.dataset.type === 'single') {
            accordionBtn.forEach(item => {
                item.classList.remove('on');
                item.nextElementSibling.style.maxHeight = null;
                accordionBtn[index].classList.add('on');
            })
            // accordionBtn[index].nextElementSibling.style.border = '1px solid black';
            accordionBtn[index].nextElementSibling.style.maxHeight = scrollHeight + 'px';

            return;
        }
        accordionBtn[index].classList.add('on');
        accordionBtn[index].nextElementSibling.style.maxHeight = scrollHeight + 'px';

    }

    function close(index) {
        if (index === 'all') {
            accordionBtn.forEach(item => {
                item.classList.remove('on');
            });

            return;
        }

        if (props.dataset.type === 'single') {
            accordionBtn.forEach(item => {
                item.classList.remove('on');
                item.nextElementSibling.style.maxHeight = null;
                // accordionBtn[index].classList.remove('on');
            })
            // accordionBtn[index].nextElementSibling.style.border = 0;
            accordionBtn[index].nextElementSibling.style.maxHeight = null;

            return;
        }
        accordionBtn[index].classList.remove('on');
        accordionBtn[index].nextElementSibling.style.maxHeight = null;

    }


    return {
        init: init(),
        open: open,
        close: close
    }
}


UICommon.init = function () {
    this.RefreshUI();
}

UICommon.RefreshUI = function () {
    let el = document.querySelectorAll("[data-modules]");
    // console.log(el);
    el.forEach((item, index) => {
        if (!item.classList.contains('initial')) {
            item.classList.add('initial');
            new UICommon.Accordion(item);
        }


    });
}


window.addEventListener('load', () => {
    UICommon.init();
});