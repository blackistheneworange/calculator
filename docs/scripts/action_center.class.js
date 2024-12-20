import isMathOperator from "./helpers/is-math-operator.js";
import isMiscOperator from "./helpers/is-misc-operator.js";

class ActionCenter {
    selector__number_buttons;
    selector__math_operation_buttons;
    selector__other_operation_buttons;
    selector__prev_history_button;
    selector__next_history_button;

    constructor(updateInput, updateResult){
        this.updateInput = updateInput;
        this.updateResult = updateResult;
        this.selector__number_buttons = document.getElementById('number_buttons');
        this.selector__math_operation_buttons = document.getElementById('math_operation_buttons');
        this.selector__other_operation_buttons = document.getElementById('other_operation_buttons');
        this.selector__prev_history_button = document.getElementById('prev_history');
        this.selector__next_history_button = document.getElementById('next_history');
    }

    createNumberButton(value){
        const element = document.createElement('button');
        element.className = 'bg-orange-500 text-xl md:w-1/4 border-1 rounded shadow p-3 text-white m-2';
        element.textContent = value;
        this.selector__number_buttons.appendChild(element);
        return element;
    }
    
    createOperationButton(value){
        const element = document.createElement('button');
        element.className = 'bg-orange-500 text-xl md:w-1/4 border-1 rounded shadow p-3 text-white m-2';
        element.innerHTML = value;
        if(isMathOperator(value) || isMiscOperator(value)){
            this.selector__math_operation_buttons.appendChild(element);
        }
        else{
            this.selector__other_operation_buttons.appendChild(element);
        }
        return element;
    }

    getPreviousHistoryButton(){
        return this.selector__prev_history_button;
    }
    
    getNextHistoryButton(){
        return this.selector__next_history_button;
    }

    setPreviousHistoryDisabledStatus(curr_history_index){
        this.selector__prev_history_button.disabled = curr_history_index===0;
    }
    
    setCurrentHistoryDisabledStatus(history_length, curr_history_index){
        this.selector__next_history_button.disabled = curr_history_index>=history_length-1;
    }

    setHistoryDisabledStatus(history_length, curr_history_index){
        this.setPreviousHistoryDisabledStatus(curr_history_index);
        this.setCurrentHistoryDisabledStatus(history_length, curr_history_index);
    }
}

export default ActionCenter;