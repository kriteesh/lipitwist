body = document.body;

container = create(body)('div')('container')({});

header = create(container)('div')('header')({});

lefthead = create(header)('div')('lefthead')({});

lefthead.innerText = heading.split(" ")[0];

righthead = create(header)('div')('righthead')({});

righthead.innerText = heading.split(" ")[1];


area = create(container)('textarea')('area')({placeholder:'Type here in Harvard-Kyoto Protocol...',style:"height:10vh"});

chooser = create(container)('select')('chooser')({});

options = choosy.map(x=>{
    y = create(chooser)('option')('options')({});
    y.innerText = x["tag"];
    y.value = x["lingo"];
    return y;
});

reflection = create(container)('textarea')('area')({style:"height:10vh"});

footer = create(container)('div')('footer')({});

saver = create(footer)('div')('saver')({});
saver.innerText = 'Save as Text File';

copier = create(footer)('div')('copier')({});
copier.innerText = 'Copy to Clipboard';

// aksCont = create(container)('div')('footer')({});

matCont = create(container)('div')('matCont')({});
matTitle = create(matCont)('div')('matTitle')({});
matTitle.innerText = 'Vakibs - Sankshiptor';
matValue = create(matCont)('div')('area short')({style:"height:10vh"});


nasalSoundCorr = arr => arr.replace(/[JNnm](?=k|g)/g,'G').replace(/[GNnm](?=c|j)/g,'J').replace(/[GJnm](?=T|D)/g,'N').replace(/[GJNm](?=t|d)/g,'n').replace(/[GJNn](?=p|b)/g,'m');


twist = (lang) =>(val)=> { 
    if(val==null) reflection.innerHTML = '';
    else {
        if(chooser.value=='english') reflection.innerHTML = hkToIast(val);
        else {
            reflection.innerHTML = devToLang(hkToDev(val))(lang);
            converted = hkToDev(area.value);
            if(converted!=''){
                initials = converted.split(/\s+/g).map(x=>akshara(x)[0]);
                finaling = akshara(converted.split(/\s+/g).filter(x=>x!='').slice(-1)[0]);
                if(finaling.length==1) finals = '';
                else finals = finaling.slice(-1)[0];
                matValue.innerHTML = devToLang(initials.join('') + finals)(lang);
            }
            else  matValue.innerHTML = '';
            

            // aksharas = akshara(hkToDev(val)).filter(x=>(x!=' '));
            // maatras = guruLaghu(akshara(hkToDev(val)).filter(x=>(x!=' ')));
            // matValue.innerHTML = aksharas.map((x,i)=> maatras[i]==1 ? '<span>'  + devToLang(x)(lang) + '</span>' : '<span style="font-weight : bold">'  + devToLang(x)(lang) + '</span>').join(' ');
        
        }
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
    else{
        reflection.innerHTML = devToLang(numero(hkToDev(area.value)))(chooser.value.split(","));       
        converted = hkToDev(area.value);
        if(converted!=''){
            initials = converted.split(/\s+/g).map(x=>akshara(x)[0]);
            finaling = akshara(converted.split(/\s+/g).filter(x=>x!='').slice(-1)[0]);
            if(finaling.length==1) finals = '';
            else finals = finaling.slice(-1)[0];
            matValue.innerHTML = devToLang(initials.join('') + finals)(chooser.value.split(","));
        }
        else  matValue.innerHTML = '';
        // maatras = guruLaghu(akshara(hkToDev(area.value)).filter(x=>(x!=' ')));
        // matValue.innerHTML = 
    }

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


