import ActionCenter from "./action_center.class.js";
import appConfig from "./config.js";
import { AC_KEY, DECIMAL_POINT, EMPTY_INPUT } from "./constants.js";
import DisplayScreen from "./display_screen.class.js";

import isClearOperator from "./helpers/is-clear-operator.js";
import isDecimalPoint from "./helpers/is-decimal-point.js";
import isResultOperator from "./helpers/is-result-operator.js";
import isValidValue from "./helpers/is-valid-value.js";

import resetCursorRange from "./helpers/reset-cursor-range.js";
import computeClearOperation from "./utils/clear_operations.js";
import computeResultOperation from "./utils/result_operations.js";

class Calculator {
    action_center;
    display_screen;
    input;
    prev_input;
    history;
    curr_history_index;
    has_decimal_point;

    constructor(){
        this.display_screen = new DisplayScreen();
        this.action_center = new ActionCenter();
        this.input = EMPTY_INPUT;
        this.prev_input = EMPTY_INPUT;
        this.history = [];
        this.curr_history_index = 0;
        this.has_decimal_point = false;

        this.addNumberButtons();
        this.addOperationButtons();
        this.addHistoryFunctionality();
        this.display_screen.updateDisplayScreen(this.input);
        this.display_screen.updateOnKeyDownListener(this,this.onKeyDown);
    }

    updateInput(value){
        if(!isValidValue(value, this.input, this.has_decimal_point)) throw new Error("Invalid input");
        if(!this.input || this.input === EMPTY_INPUT) this.input = value;
        else this.input += value;
        
        if(isDecimalPoint(value)) this.has_decimal_point = true;

        this.display_screen.updateDisplayScreen(this.input);
    }

    onKeyDown(ev){
        ev.preventDefault();
        let { key: value } = ev;
        
        value = value.trim();
        
        try{
            if(isNaN(+value) && !isDecimalPoint(value)) this.performOperation(value);
            else this.updateInput(value);
            resetCursorRange(ev.target);
        }
        catch(err){
            console.log(err);
        }
    }
    
    performOperation(operation){
        if(!isValidValue(operation, this.input)) throw new Error("Invalid input");

        let result;
        if(!isResultOperator(operation) && !isClearOperator(operation)){
            this.has_decimal_point = false;
            if(this.input === EMPTY_INPUT) this.input = operation;
            else this.input += operation;
            this.display_screen.updateDisplayScreen(this.input);
            return;
        }
        else if(isResultOperator(operation)){
            result = computeResultOperation(this.input, operation);
        }
        else if(isClearOperator(operation)){
            result = computeClearOperation(this.input, operation);
        }
        this.updateResult(result, operation);
    }
    
    updateResult(value, operation){
        if(value === undefined || value === this.input) return;
        if(appConfig.alertMessages.includes(value)) {
            alert(value);
            return;
        }

        if(isResultOperator(operation)) {
            if(this.curr_history_index !== this.history.length-1){
                this.history = this.history.slice(0, this.curr_history_index+1);
            }
            this.history.push({
                input: value,
                prev_input: this.input
            });
            this.curr_history_index = this.history.length-1;
            this.prev_input = this.input;
            if(value.includes(DECIMAL_POINT)) this.has_decimal_point = true;
        }
        else if(operation === AC_KEY){
            this.history = [];
            this.curr_history_index = 0;
        }
        this.input = value;

        this.display_screen.updateDisplayScreen(this.input, this.prev_input);
        this.action_center.setHistoryDisabledStatus(this.history.length, this.curr_history_index);
    }

    moveHistory(forward){
        if((this.curr_history_index === 0 && !forward) || (this.curr_history_index === this.history.length-1 && forward)) return;
        
        if(forward){
            this.curr_history_index++;
        }
        else{
            this.curr_history_index--;
        }

        this.input = this.history[this.curr_history_index].input;
        this.prev_input = this.history[this.curr_history_index].prev_input;

        this.display_screen.updateDisplayScreen(this.input, this.prev_input);
        this.action_center.setHistoryDisabledStatus(this.history.length, this.curr_history_index);
    }
    
    addNumberButtons(){
        for(let i=1;i<=11;i++){
            const value = i<=10 ? (i%10).toString() : '.';
            const numberButton = this.action_center.createNumberButton(value);
            numberButton.onclick = this.updateInput.bind(this, value);
        }
    }
    
    addOperationButtons(){
        [...appConfig.mathOperations, ...appConfig.resultOperations, ...appConfig.miscOperations, ...appConfig.clearOperations]
        .filter(op => !appConfig.noDisplay.includes(op))
        .forEach(operation => {
            const operationButton = this.action_center.createOperationButton(operation);
            operationButton.onclick = this.performOperation.bind(this, operation);
        })
    }

    addHistoryFunctionality(){
        const prev_history_button = this.action_center.getPreviousHistoryButton();
        const next_history_button = this.action_center.getNextHistoryButton();

        prev_history_button.onclick = this.moveHistory.bind(this, false);
        next_history_button.onclick = this.moveHistory.bind(this, true);
        this.action_center.setHistoryDisabledStatus(this.history.length, this.curr_history_index);
    }
}

export default Calculator;