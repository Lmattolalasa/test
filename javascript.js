document.addEventListener("DOMContentLoaded", function () {
    const buttonLeft = document.querySelector('.button_left');
    const buttonRight = document.querySelector('.button_right');
    const participants = document.querySelectorAll('.participants_people > div');
    const participantItems = document.querySelectorAll(".participant");

    let currentParticipant = 0;
    let currentIndex = 0;

    function checkScreenSize() {
        if (window.innerWidth > 1366) {
            buttonRight.addEventListener('click', () => {
                currentParticipant = (currentParticipant + 3) % participants.length;
                showParticipants();
            });

            buttonLeft.addEventListener('click', () => {
                currentParticipant = (currentParticipant - 3 + participants.length) % participants.length;
                showParticipants();
            });

            function showParticipants() {
                participants.forEach(participant => {
                    participant.style.display = 'none';
                });

                for (let i = 0; i < 3; i++) {
                    const index = (currentParticipant + i) % participants.length;
                    participants[index].style.display = 'block';
                }
                const endIndex = Math.min(currentParticipant + 3, participants.length);
                document.querySelector('.button_text').textContent = `${endIndex}/6`;
            }

            showParticipants();

            let autoScrollInterval = setInterval(() => {
                buttonRight.click();
            }, 4000); // auto scroll every 4 seconds

            buttonRight.addEventListener('click', () => {
                clearInterval(autoScrollInterval); // Stop auto scroll when manually clicking
                autoScrollInterval = setInterval(() => {
                    buttonRight.click();
                }, 4000); // Restart auto scroll after click
            });

            buttonLeft.addEventListener('click', () => {
                clearInterval(autoScrollInterval); // Stop auto scroll when manually clicking
                autoScrollInterval = setInterval(() => {
                    buttonRight.click();
                }, 4000); // Restart auto scroll after click
            });
        } else {
            function showParticipant(index) {
                participantItems.forEach(item => {
                    item.style.display = "none";
                });
                participantItems[index].style.display = "block";
                const button_text = document.querySelector(".button_text");
                button_text.innerText = (index + 1) + "/" + participantItems.length;
            }

            function nextParticipant() {
                currentIndex = (currentIndex + 1) % participantItems.length;
                showParticipant(currentIndex);
            }

            showParticipant(currentIndex);

            let timer = setInterval(nextParticipant, 4000); // change slide every 4 seconds

            buttonLeft.addEventListener("click", function () {
                clearInterval(timer); // stop timer on click
                currentIndex = (currentIndex - 1 + participantItems.length) % participantItems.length;
                showParticipant(currentIndex);
                timer = setInterval(nextParticipant, 4000); // restart timer
            });

            buttonRight.addEventListener("click", function () {
                clearInterval(timer); // stop timer on click
                currentIndex = (currentIndex + 1) % participantItems.length;
                showParticipant(currentIndex);
                timer = setInterval(nextParticipant, 4000); // restart timer
            });
        }
    }

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

});

document.addEventListener('DOMContentLoaded', function () {
    let currentStage = 0;
    const stages = document.querySelectorAll('.stage_all > div');
    const dots = document.querySelectorAll('.dot');
    let originalContents = {};
    let effectiveStagesCount = 5;

    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');


    function showStage(n) {
        stages.forEach((stage, index) => {
            if (index === n) {
                stage.style.display = 'block';
            } else {
                stage.style.display = 'none';
            }
        });
    }

    function updateDots(n) {
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === n) {
                dot.classList.add('active');
            }
        });
    }

    leftArrow.addEventListener('click', prevStage);
    rightArrow.addEventListener('click', nextStage);

    function updateArrowsAvailability() {
        if (currentStage === 0) {
            leftArrow.disabled = true;
        } else {
            leftArrow.disabled = false;
        }

        if (currentStage === effectiveStagesCount - 1) {
            rightArrow.disabled = true;
        } else {
            rightArrow.disabled = false;
        }
    }


    function nextStage() {
        currentStage = (currentStage + 1) % effectiveStagesCount;
        showStage(currentStage);
        updateDots(currentStage);
        updateArrowsAvailability();
    }

    function prevStage() {
        currentStage = (currentStage - 1 + effectiveStagesCount) % effectiveStagesCount;
        showStage(currentStage);
        updateDots(currentStage);
        updateArrowsAvailability();
    }

    updateArrowsAvailability();

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentStage = index;
            showStage(currentStage);
            updateDots(currentStage);
        });
    });

    function handleResize() {
        if (window.innerWidth < 1366) {
            showStage(currentStage);
            updateDots(currentStage);

            // Объединение блоков
            if (!originalContents.stage_first) {
                originalContents.stage_first = stage_first.innerHTML;
                originalContents.stage_second = stage_second.innerHTML;
                originalContents.stage_third = stage_third.innerHTML;
                originalContents.stage_four = stage_four.innerHTML;
                originalContents.stage_five = stage_five.innerHTML;
                originalContents.stage_six = stage_six.innerHTML;
                originalContents.stage_seven = stage_seven.innerHTML;
            }

            stage_first.innerHTML = originalContents.stage_first + originalContents.stage_second;
            stage_second.innerHTML = originalContents.stage_third;
            stage_third.innerHTML = originalContents.stage_four + originalContents.stage_five;
            stage_four.innerHTML = originalContents.stage_six;
            stage_five.innerHTML = originalContents.stage_seven;
        } else {
            // Возвращение к исходному состоянию
            if (originalContents.stage_first) {
                stages.forEach((stage, index) => {
                    stage.style.display = 'block';
                });
                updateDots(currentStage);

                stage_first.innerHTML = originalContents.stage_first;
                stage_second.innerHTML = originalContents.stage_second;
                stage_third.innerHTML = originalContents.stage_third;
                stage_four.innerHTML = originalContents.stage_four;
                stage_five.innerHTML = originalContents.stage_five;
                stage_six.innerHTML = originalContents.stage_six;
                stage_seven.innerHTML = originalContents.stage_seven;

                originalContents = {}; // Очистка сохраненных данных
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    const stage_first = document.querySelector('.stage_first');
    const stage_second = document.querySelector('.stage_second');
    const stage_third = document.querySelector('.stage_third');
    const stage_four = document.querySelector('.stage_four');
    const stage_five = document.querySelector('.stage_five');
    const stage_six = document.querySelector('.stage_six');
    const stage_seven = document.querySelector('.stage_seven');
});

