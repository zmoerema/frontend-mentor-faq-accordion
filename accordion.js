const rootStyles = getComputedStyle(document.documentElement);

const iconPlus = 'assets/images/icon-plus.svg';
const iconMinus = 'assets/images/icon-minus.svg';

const faqFactory = (faqHTMl) => {
    let faq = {
        _question: faqHTMl.getElementsByClassName('q-container')[0],
        _accordionIcon: faqHTMl.getElementsByClassName('accordion-icon')[0],
        _answer: faqHTMl.getElementsByClassName('answer')[0],
        _isAnswerDisplayed: false,

        get question() {
            return this._question;
        },

        get accordionIcon() {
            return this._accordionIcon;
        },

        get answer() {
            return this._answer;
        },

        questionMouseOver() {
            const purple = rootStyles.getPropertyValue('--Purple');
            this._question.style.color = purple;
        },

        questionMouseOut() {
            const darkPurple = rootStyles.getPropertyValue('--Dark-purple');
            this._question.style.color = darkPurple;
        },

        showAnswer() {
            this._accordionIcon.src = iconMinus;
            this._answer.style.display = 'block';
        },

        hideAnswer() {
            this._accordionIcon.src = iconPlus;
            this._answer.style.display = 'none';
        },

        accordionIconClicked() {
            if (this._isAnswerDisplayed) {
                this.hideAnswer()
            } else {
                this.showAnswer()
            }

            this._isAnswerDisplayed = !this._isAnswerDisplayed;
        },

        keyPressed(event) {
            if (event.key === 'ArrowUp' && this._isAnswerDisplayed) {
                this.hideAnswer();
            } else if (event.key === 'ArrowDown' && !this._isAnswerDisplayed) {
                this.showAnswer();
            }

            this._isAnswerDisplayed = !this._isAnswerDisplayed;
          }
    };

    return faq;
};


let faqContainers = document.getElementsByClassName('faq-container');

Array.from(faqContainers).forEach(faqContainer => {
    let faq = faqFactory(faqContainer);
    
    faq.question.addEventListener('click', () => {
        faq.accordionIconClicked();
    });

    faq.question.addEventListener('mouseover', () => {
        faq.questionMouseOver();
    });

    faq.question.addEventListener('mouseout', () => {
        faq.questionMouseOut();
    });

    faq.question.addEventListener('keydown', (event) => {
        faq.keyPressed(event);
    });
});
