import { EMPTY_INPUT } from "./constants.js";

class DisplayScreen {
    selector__display_screen;
    selector__display_screen_input;
    selector__display_screen_input_placeholder;
    selector__display_screen_prev_input;
    
    constructor(){
        this.selector__display_screen = document.getElementById('display_screen');
        this.selector__display_screen_input = document.querySelector('#display_screen div.input');
        this.selector__display_screen_input_placeholder = document.querySelector('#display_screen span.placeholder');
        this.selector__display_screen_prev_input = document.querySelector('#display_screen>span');

        this.selector__display_screen.onclick = () => this.selector__display_screen_input.focus();
        this.selector__display_screen_input.onfocus = () => this.selector__display_screen_input_placeholder.classList.add('hidden');
        this.selector__display_screen_input.onblur = () => {
            if(this.selector__display_screen_input.textContent.length === 0){
                this.selector__display_screen_input_placeholder.classList.remove('hidden');
            }
            else{
                this.selector__display_screen_input_placeholder.classList.add('hidden');
            }
        }
    }
    
    updateDisplayScreen(value, prev_value){
        if(value === undefined || value === null) return;

        if(value.length===0) {
            this.selector__display_screen_input.textContent = EMPTY_INPUT;
            this.selector__display_screen_input_placeholder.classList.remove('hidden');
            this.selector__display_screen_prev_input.textContent = '';
        }
        else {
            this.selector__display_screen_input_placeholder.classList.add('hidden');
            this.selector__display_screen_input.textContent = value;
            if(prev_value!==undefined) this.selector__display_screen_prev_input.textContent = `${prev_value} =`;
        }
    }

    updateOnKeyDownListener(instance, listenerFn){
        this.selector__display_screen_input.onkeydown = listenerFn.bind(instance);
    }
}

export default DisplayScreen;