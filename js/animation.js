let e = document.querySelector('.features__clients-count');
let n = 0;
function countUp(num, step, t) {
    if (n < num) {
        if(num - n < step + 70) {
        t += 15;
        step = Math.ceil(Math.random() * 25);
        n += step;
        e.innerHTML = n;
        if (n >= num) {
            e.innerHTML = num + '+';
        }
    }   
      else {
        n += step;
        e.innerHTML = n;
    }
    setTimeout((() => countUp(num, step, t)), t)
}

}


class Modal {
    anyModal = Modal.create();
    closing = false;
    static create () {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.insertAdjacentHTML('afterbegin', `
        <div class="modal_overlay">
            <div class="modal_window">
                <span class="modal_close">&times;</span>
                <form>
                    <label for="your-budget">Ваш бюджет</label><br>
                    <input id="your-budget" type="number" placeholder="Введите значение">
                    <button type='button' class='JSbutton'>Подтвердить</button>
                </form>
            </div>
        </div>`)
        document.body.appendChild(modal);
        return modal
    }
    open() {
        !this.closing && this.anyModal.classList.add('open')
    }
    close() {
        this.closing = true;
        this.anyModal.classList.remove('open')
        this.anyModal.classList.add('fading')
        setTimeout(() => {
            this.anyModal.classList.remove('fading')
            this.closing = false
        }, 400)
    }
}
let modal = new Modal();
const select = document.querySelector('#budget');
select.addEventListener('change', function(event) {
    let optionToChanged = event.target.lastElementChild;
    const input = document.querySelector('.modal_window input');
    if (event.target.value === 'other') {
        modal.open();
        document.addEventListener('click', function clack(event) {
            const layout = event.target.classList.contains('modal_overlay');
            const times = event.target.classList.contains('modal_close');
            const submit = event.target.classList.contains('JSbutton')
            if (layout || times) {
                modal.close();
                document.removeEventListener('click', clack);
            }
            if (submit) {
                if(input.value) {
                    optionToChanged.innerText = input.value;
                    optionToChanged.value = input.value;
                };
                input.value = '';
                modal.close();
                document.removeEventListener('click', clack);
            }
            
        })
        } else if (event.target.value !== 'other') {
            optionToChanged.innerText = 'Другое';
            optionToChanged.value = 'other';
        }
})

document.addEventListener('scroll', scrolled);
function scrolled () {
    const header = document.querySelector('header');
    let windowBottom = window.scrollY + window.innerHeight;
    const countUpPosition = e.offsetTop;
    let scrolledState = false;
    if (window.scrollY > 0) {
        header.classList.add('header__scrolled');
    } else {
        header.classList.remove('header__scrolled')
    }
    if (windowBottom >= countUpPosition && !scrolledState) {
        scrolledState = true;
        countUp(5000, 81, 70)
    }
}


function smoothScroll(elem) {
    elem.addEventListener('click', (ev) => {
        ev.preventDefault();
        document.querySelector(ev.target.getAttribute('href')).scrollIntoView({behavior: "smooth"})
    })
}
document.querySelectorAll('a[href^="#"]').forEach(elem => smoothScroll(elem));
smoothScroll(document.querySelector('.info-button'));