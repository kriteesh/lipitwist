const akshara = shabda => {
    var verse = shabda; 
    var res = ""; 
    var pew = "";
    var re = /[ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह अ आ इ ई उ ऊ ऋ ॠ ॡ ए ऐ ओ औ ऌ ळ ](?!्)/g ;
    do {
        m = re.exec(verse);
        if (m) {
            res = res + m.index + "," ;
        }
    } while (m);

    res = res.split(",").filter(Boolean);
    res[0] ="0";
    verse = verse.split("");
    for(var i=0; i<=res.length-1;i++)
    { 
        if(i==res.length-1)
        { 
            for(var k=parseInt(res[res.length-1]); k<= verse.length-1; k++)
            {
                pew = pew + verse[k]; 
            }
        }

        for(var j=parseInt(res[i]);j<=parseInt(res[i+1])-1;j++)
        {
            pew = pew + verse[j];
        }
        pew = pew + "|"; 
    }

    pew = pew.split("|").filter(Boolean);
    return pew; 
}


const guruLaghu = (arr) => arr.map(x=>(x.match(/ा|ी|ू|ॄ|ॄ|े|ै|ो|ौ|ं|ः|्/ig)!=null)? 2:1)

