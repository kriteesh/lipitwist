body = document.body;

container = create(body)('div')('container')({});

header = create(container)('div')('header')({});

lefthead = create(header)('div')('lefthead')({});

lefthead.innerText = heading.split(" ")[0];

righthead = create(header)('div')('righthead')({});

righthead.innerText = heading.split(" ")[1];


area = create(container)('textarea')('area')({placeholder:'Type here in Harvard-Kyoto Protocol..Our protocol is under development'});

// tablet_ = create(container)('div')('tablet')({});

// tabs_ = ['Nasal Correction','Clear'].map(x=>{
//     y = create(tablet_)('div')('tabs')({});
//     y.innerText = x;
//     return y;
// });

// guide = create(container)('div')('guide')({});

// tablet = create(container)('div')('tablet')({});

// tabs = ['Previous','Next','Hide'].map(x=>{
//     y = create(tablet)('div')('tabs')({});
//     y.innerText =x;
//     return y;
// });

// devanagari.map((x,i)=>{
//     if(i<16){
//     y = create(guide)('div')('guidette')({});
//     y.innerText = devanagari[i] + " " + oriya[i];
//     }
// })

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



twist = (lang) =>(val)=> { 
    if(val==null) reflection.innerHTML = '';
    reflection.innerHTML = devToLang(hkToDev(val))(lang);
}

area.onkeyup = () => {
    twist(chooser.value.split(","))(area.value);
}

chooser.onchange = () =>{
    if(chooser.value == 'english'){
        if(area.value.length==0) reflection.innerHTML = "";
        else reflection.innerHTML = hkToIast(area.value);
    }
    else reflection.innerHTML = devToLang(hkToDev(area.value))(chooser.value.split(","));
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



