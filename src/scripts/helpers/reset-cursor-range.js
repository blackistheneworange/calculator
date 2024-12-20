const resetCursorRange = (node) => {
    if(node.textContent.length === 0) return;
    const range = document.createRange();
    const selection = window.getSelection();
    
    range.setStart(node, 1);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

export default resetCursorRange;