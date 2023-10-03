document.addEventListener('DOMContentLoaded', function() {
    // If the comparison slider is present on the page, let's initialize it
    let comparisonSliders = document.querySelectorAll('.comparison-slider');

    if (comparisonSliders.length > 0) {
        comparisonSliders.forEach(function(slider) {
            let compSliderWidth = slider.offsetWidth + 'px';
            let resizeImg = slider.querySelector('.resize img');
            resizeImg.style.width = compSliderWidth;
            drags(slider.querySelector('.divider'), slider.querySelector('.resize'), slider);
        });

        window.addEventListener('resize', function() {
            comparisonSliders.forEach(function(slider) {
                let compSliderWidth = slider.offsetWidth + 'px';
                let resizeImg = slider.querySelector('.resize img');
                resizeImg.style.width = compSliderWidth;
            });
        });
    }
});

function drags(dragElement, resizeElement, container) {
    let touched = false;

    window.addEventListener('touchstart', function() {
        touched = true;
    });

    window.addEventListener('touchend', function() {
        touched = false;
    });

    dragElement.addEventListener('mousedown', function(e) {
        dragElement.classList.add('draggable');
        resizeElement.classList.add('resizable');

        let startX = e.pageX || e.touches[0].pageX;
        let dragWidth = dragElement.offsetWidth;
        let posX = dragElement.getBoundingClientRect().left + dragWidth - startX;
        let containerOffset = container.getBoundingClientRect().left;
        let containerWidth = container.offsetWidth;
        let minLeft = containerOffset + 10;
        let maxLeft = containerOffset + containerWidth - dragWidth - 10;

        function onMouseMove(e) {
            if (!touched) {
                e.preventDefault();
            }

            let moveX = e.pageX || e.touches[0].pageX;
            let leftValue = moveX + posX - dragWidth;

            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            let widthValue = ((leftValue - containerOffset) / containerWidth) * 100 + '%';

            dragElement.style.left = widthValue;
            resizeElement.style.width = widthValue;
        }

        function onMouseUp() {
            dragElement.classList.remove('draggable');
            resizeElement.classList.remove('resizable');
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    dragElement.addEventListener('mouseup', function() {
        dragElement.classList.remove('draggable');
        resizeElement.classList.remove('resizable');
    });
}
