body = document.body;

container = create(body)('div')('container')({});

header = create(container)('div')('header')({});

lefthead = create(header)('div')('lefthead')({});

lefthead.innerText = heading.split(" ")[0];

righthead = create(header)('div')('righthead')({});

righthead.innerText = heading.split(" ")[1];

area = create(container)('textarea')('area')({placeholder:'Type here in Harvard-Kyoto Protocol\n\nType any random numbers as well to see the magic'});

chooser = create(container)('select')('chooser')({});

options = choosy.map(x=>{
    y = create(chooser)('option')('options')({});
    y.innerText = x["tag"];
    y.value = x["lingo"];
    return y;
});

reflection = create(container)('textarea')('reflection')({readonly:true});

footer = create(container)('div')('footer')({});

saver = create(footer)('div')('saver')({});
saver.innerText = 'Save as Text File';

copier = create(footer)('div')('copier')({});
copier.innerText = 'Copy to Clipboard';

nasalSoundCorr = arr => arr.replace(/[JNnm](?=k|g)/g,'G').replace(/[GNnm](?=c|j)/g,'J').replace(/[GJnm](?=T|D)/g,'N').replace(/[GJNm](?=t|d)/g,'n').replace(/[GJNn](?=p|b)/g,'m');


twist = (lang) =>(val)=> { 
    if(val==null) reflection.innerHTML = '';
    else {
        if(chooser.value=='english') reflection.innerHTML = hkToIast(area.value);
        else reflection.innerHTML = devToLang(hkToDev(val))(lang);
    }  
}

numero = arr =>{
    re = arr.match(/[0-9]+/ig);
    if(re!=null){
        for(let i=0; i<re.length; i++){
            arr = arr.replace(re[i],twoStep(re[i]));
        }
    }
  return arr;
}

area.onkeyup = () => {
    twist(chooser.value.split(","))(nasalSoundCorr(numero(area.value)));
}

chooser.onchange = () =>{
    if(chooser.value == 'english'){
        reflection.innerText = hkToIast(area.value);
    }
    else reflection.innerText = devToLang(hkToDev(area.value))(chooser.value.split(","));
}

destroyClickedElement = (event) => document.body.removeChild(event.target);


saver.onclick = () =>{
    var textToSave = reflection.value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    //var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
	var fileNameToSaveAs = "lipiTwist_" + chooser.value[34] + '.txt';
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}

copier.onclick = () => {
    reflection.select();
    reflection.setSelectionRange(0, 99999)
    document.execCommand("copy");

}



