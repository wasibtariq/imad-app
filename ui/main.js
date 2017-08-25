
var button = document.getElementById('counter');
button.onclick= function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function ()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status === 200)
            {
                var counter = request.responseText;
                counter = counter + 1;
                var span = document.getElementById('count');
                span.innerHTML= counter.toString();
            }
        }
    };
    
    request.open('GET', 'http://wasibtariq95.imad.hasura-app.io/counter',true);
    request.send(null);
    
};

var nameInput = document.getElementById('name');
var submitbut = document.getElementById('submit_but');

submitbut.onclick = function(){
    
    var names=[name1,name2];
    var list='';
    for(var i=0;i<names.length;i++)
    {
        list+= <li> +names[i]+ </li>;
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
}