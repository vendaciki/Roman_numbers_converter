function resetFields(pForm){
    pForm.reset();
    document.getElementById('romanNumbersDiv').innerHTML='';
}

romVals={'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000 };
function romanConversion(){
    var dropDownType = document.getElementById("romanConversionType");
    var convType = dropDownType.options[dropDownType.selectedIndex].value;
    var chars=document.getElementById('romanNumbersText').value;
    var splitChars=chars.split(' ');

    if (chars.length>0){
        var newDiv='<b>Result:</b><br>';
    }else{
        document.getElementById('romanNumbersDiv').innerHTML='';
        return;
    }

    newDiv+='<textarea id="romanNumbersResult" rows="5" cols="100" style="font-family:Arial">';
    if (convType=='r2d'){
        var romNums = {'M':1000,'CM':900,'D':500,'CD':400,'C':100,'XC':90,
                        'L':50,'XL':40,'X':10,'IX':9,'V':5,'IV':4,'I':1};
        for (i=0; i<splitChars.length; i++){
            var decNum=0;
            var romChars=splitChars[i].toUpperCase();
            if (romChars==''){
                newDiv+='';
            }else if (!romChars.match(/^[MDCLXVI]+$/)){
                newDiv+='[Check number] ';
            }else{
                for (r in romNums){
                    if (r.length==1){
                        var count=0;
                        while (romChars.substring(0,1)==r && count<3){
                            decNum+=romNums[r];
                            romChars=romChars.substring(1);
                            count+=1;
                        }
                    }else{
                        if (romChars.substring(0,2)==r){
                            decNum+=romNums[r];
                            romChars=romChars.substring(2);
                        }
                    }
                }
                if (romChars.length>0){
                    newDiv+='[Check number] ';
                }else{
                    newDiv+=decNum+' ';
                }
            }
        }
    }else{
        for (i=0; i<splitChars.length; i++){
            var num=parseInt(splitChars[i],10);
            if (num>0 && num<4000) {
                thousends=new Array('','M','MM','MMM');
                hundreds=new Array('','C','CC','CCC','CD','D','DC','DCC','DCCC','CM');
                tens=new Array('','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'),
                ones=new Array('','I','II','III','IV','V','VI','VII','VIII','IX');
                th=Math.floor(num/1000);
                num-=th*1000;
                h=Math.floor(num/100);
                num-=h*100;
                te=Math.floor(num/10);
                num-=te*10;
                newDiv+=thousends[th]+hundreds[h]+tens[te]+ones[num]+' ';
            }else{
                newDiv+='[Check number] ';
            }
        }
    }

    newDiv+='</textarea>';
    document.getElementById('romanNumbersDiv').innerHTML=newDiv;
}