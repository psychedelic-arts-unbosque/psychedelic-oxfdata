import DictionaryStore from '../../stores/DictionaryStore';
const addSelectorEventListener = () => {
    console.log("executes sucessfully");

    const readSelection = (event: Event) => {
        console.log("selection observes");
        const selection = window.getSelection();
        console.log(selection);
    }

    const readDblClick = (event: Event) => {
        console.log("clicked observed");
        const element = event.target;
        document.execCommand("copy")
        navigator.clipboard.readText().then(text => console.log(text));
        
    }

    window.addEventListener("select", readSelection);
    window.addEventListener("dblclick", readDblClick);
}

export default addSelectorEventListener;