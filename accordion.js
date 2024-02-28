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

        accordionIconClicked() {
            if (this._isAnswerDisplayed) {
                this._accordionIcon.src = iconPlus;
                this._answer.style.display = 'none';
            } else {
                this._accordionIcon.src = iconMinus;
                this._answer.style.display = 'block';
            }

            this._isAnswerDisplayed = !this._isAnswerDisplayed;
        }
    };

    return faq;
};


let faqContainers = document.getElementsByClassName('faq-container');

// TODO Navigate the questions and hide/show answers using keyboard navigation alone

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
});
