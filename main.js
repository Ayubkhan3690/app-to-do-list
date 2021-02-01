var database = [];
var done = [];
var selectedIndex = -1;

function addBoard() {
    var title = document.getElementById('board-title').value;

    if (title.trim().length > 0){

        if (selectedIndex >= 0){
            database[selectedIndex].title = title;
            selectedIndex = -1;
        } else {
            var newBoard = {
                title: title,
                items: []
            };
            database.push(newBoard);
        }

        drawPage();
        document.getElementById('board-title').value = "";
    } else {
        alert("Sarlavhani kiriting!");
    }
}

function drawPage(){
    var content = "";

    for (var i = 0; i < database.length; i++){
        var content2 = "";
        for (var j = 0; j < database[i].items.length; j++){
            content2 +=
                "<div class='item position-relative'><span onclick='editItem("+ i + "," + j +")'>" + database[i].items[j] + "</span><button type='button' class='close' onclick='deleteItem("+ i + "," + j +")'>&times;</button></div>";
        }

        content +=
            "<div class='col-12 mb-3'>" +
                "<div class='card'>" +
                    "<div class='card-header d-flex justify-content-between'><h5 onclick='editBoard("+ i +")'>"+ database[i].title +
                    "</h5>" +
                    "<button onclick='Done("+ i +")' class= 'btn btn-danger'>X</button>" +  "</div>" +
            "</div>" +
            "</div>"
    }

    document.getElementById('content').innerHTML = content;
    calcl();
}

function editBoard(index) {
    document.getElementById('board-title').value = database[index].title;

    selectedIndex = index;
}

function Done(index) {
    done.push(database[index]);
    database = database.filter((a, i) =>{
        return i !== index
    })

    drawPage();
    DrawDone();
    // var terry =
    //         "<div class='col-12 mb-3'>" +
    //             "<div class='card'>" +
    //                 "<div class='card-header d-flex justify-content-between'><h5 onclick='editBoard("+ i +")'>"+ database[i].title +
    //                 "<button  class= 'btn btn-danger'>X</button>" +  "</div>" +
    //         "</div>" +
    //         "</div>"

}

function DrawDone() {
        var doneContent = "";

    for (var i = 0; i < done.length; i++){

        doneContent +=
            "<div class='col-12 mb-3'>" +
                "<div class='card'>" +
                    "<div class='card-header d-flex justify-content-between'><h5 onclick='editBoard("+ i +")'>"+ done[i].title +
                    "</h5>" +
                    "<button onclick='deleteDone("+ i +")' class= 'btn btn-danger'>X</button>" +  "</div>" +
            "</div>" +
            "</div>"
    }

    document.getElementById('doneContent').innerHTML = doneContent;
    calcl();
}

function calcl() {
     var progress = document.getElementById('progress');
    if (!done.length && !database.length){
        progress.style.width = "0%";
        progress.innerHTML = "0%";
    } else {
        var percent = done.length / (done.length + database.length) * 100;
        progress.style.width = percent + "%";
        progress.innerHTML = percent.toFixed(2) + "%";
    }
    
}

function deleteDone(index) {
    done= done.filter((a, i) => {
        return i !== index;
    })

    DrawDone();
}








