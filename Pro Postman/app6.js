

console.log("this this my postman")




// utility functon
// 1.utility to get element dom for string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// initilaize nuber of parameter
let addedParamCount = 0;
let parameterbox = document.getElementById('parameterbox')
parameterbox.style.display = 'none'
//  If we click json para is hide 
let pararedio = document.getElementById('paramred')
pararedio.addEventListener('click', () => {
    document.getElementById('reqjson').style.display = 'none'
    document.getElementById('parameterbox').style.display = 'block'
})
//  If we click para json is hide 
let jsonred = document.getElementById('jsonred')
jsonred.addEventListener('click', () => {
    document.getElementById('parameterbox').style.display = 'none'
    document.getElementById('reqjson').style.display = 'block'
})
// adding New parameter vai buttons
let add = document.getElementById('add');
add.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="form-row">
                                <label for="" class="col-sm-2 col-form-label "><strong>Parameter${addedParamCount + 2}</strong></label>
                                <div class="form-group col-md-4">
                                    <input type="text" class="form-control" id="parakey${addedParamCount + 2}" placeholder="Enter Parameter${addedParamCount + 2} key">
                                </div>
                                <div class="form-group col-md-4">

                                    <input type="text" class="form-control" id="paravalue${addedParamCount + 2}" placeholder="Enter Parameter${addedParamCount + 2}value">
                                </div>
                                <button class="btn btn-danger deleteParam">Remove</button>
                    </div>
                                          </div>`

    // converting elemnt  str to dom notr
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // console.log(paramelement)

    // For removing element From the prameter Element
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }

    addedParamCount++;
})

// showing user palse waite when submitt btn clcik
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    // show plasewaite
    // document .getElementById('responsejs').value = 'waite till response Come Frome servers'
    document.getElementById('resposeprism').innerHTML = 'waite till response Come Frome servers'

    // fecth all the value user has enterd

    let url = document.getElementById('url').value
    let reqesttype = document.querySelector("input[name='reqesttype']:checked").value
    let contentype = document.querySelector("input[name='contentype']:checked").value


    // if has used params option insted of json ,colect all the parameter in an obj
    if (contentype == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestjsom').value;
    }

    // debugging the colsole
    // console.log(data)
    console.log('this is', reqesttype)
    console.log('this is', data)
    console.log('this is', url)

    console.log('this is', contentype)
    // usingFecth api aagar request type post ahi to post request marna hai
    if (reqesttype == 'GET') {
        fetch(url, {
            method: "GET"

        }).then(response => response.text())
            .then((text) => {
                // let response=document.getElementById('response').value=text
                let resposeprism = document.getElementById('resposeprism').innerHTML = text
                Prism.highlightAll();
            });
    }


    else {
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text())
            .then((text) => {
                // let response=document.getElementById('response').value=text
                let resposeprism = document.getElementById('resposeprism').innerHTML = text
                Prism.highlightAll();
            });
    }

})
