import worker from 'workerize-loader!./worker';
import prettyMs from 'pretty-ms';
import 'furtive/css/furtive.css';
import './style.css'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#uploadFile");
    const input = document.querySelector("#file");
    const result = document.querySelector("#results");
    const time = document.querySelector("#time");
    const loader = document.querySelector("#loader");
    
    input.addEventListener('change', handleFile, false);
    
    const inst = worker();
    let t0;
    let t1;
    
    function handleFile(e) {
        t0 = performance.now();
        loader.classList.add('loader--active');
        const file = this.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
            const text = event.target.result;
            writeToScreen(text);
        };
    }
    
    async function writeToScreen(txt) {
        const translated = await inst.emojifyFile(txt);
        result.innerText = translated;
        t1 = performance.now();
        time.innerText = `${prettyMs((t1 - t0), {verbose: true})}.`;
        loader.classList.remove('loader--active');
    }
});