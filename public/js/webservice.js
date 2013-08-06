// webservice.js
PX = window.PX || {};

// AJAX

// Create
PX.postEmployeesHandler = function () {
    var dataObj = $('textarea[name="post_content"]').val();
    PX.clearOutput();
    $.post("/api/employees", dataObj, function(data, textStatus, jqXHR) { 
        console.log("Post response:"); 
        console.dir(data); 
        console.log(textStatus); 
        console.dir(jqXHR); 
        PX.outputHandler(data);
    });
};

// Read
PX.getEmployeesHandler = function (id) {
    var url = (id) ? "/api/employees/" + id : "/api/employees";
    PX.clearOutput();
    $.get(url, function(data, textStatus, jqXHR) { 
        console.log("Post response:"); 
        console.dir(data); 
        console.log(textStatus); 
        console.dir(jqXHR); 
        PX.outputHandler(data);
    });
};

// Update
PX.updateEmployeesHandler = function (id) {
    var dataObj = JSON.parse($('textarea[name="post_content"]').val());
    PX.clearOutput();
    $.ajax({
        url: "/api/employees/" + id, 
        type: "PUT",
        data: dataObj, 
        success: function(data, textStatus, jqXHR) { 
            console.log("PUT resposne:"); 
            console.dir(data); 
            console.log(textStatus); 
            console.dir(jqXHR); 
            PX.outputHandler(data);
        }
    });
};

// Delete
PX.deleteEmployeesHandler = function (id) {
    var serviceUrl = "/api/employees";
    PX.clearOutput();
    $.ajax({
        url: (id) ? serviceUrl + "/" + id : serviceUrl, 
        type: "DELETE", 
        success: function(data, textStatus, jqXHR) { 
            console.dir(data); 
            PX.outputHandler(data);
        }
    });
};

// handlers

PX.webserviceFormHandler = function (e) {
    var serviceOption, pid;
    e.preventDefault();
    serviceOption = $("input:radio['name=service']:checked").val();
    pid = $('#_id').val();
    if (console) { console.log("service", serviceOption); }
    switch (serviceOption) {
    case "delete_employees" :
        PX.deleteProductsHandler();
        break;
    case "delete_employee" :
        PX.deleteProductsHandler(pid);
        break;
    case "update_employees" :
        PX.updateProductsHandler(pid);
        break;
    case "update_employee" :
        PX.updateProductsHandler(pid);
        break;
    case "get_employees" :
        PX.getProductsHandler();
        break;
    case "get_employee" :
        PX.getProductsHandler(pid);
        break;
    case "post_employees" :
        PX.postProductsHandler();
        break;
    case "post_error" :
        throw new Error('cannot post /api/employees/'+ pid);
        break;
    }
};

PX.clearOutput = function () {
    $('#output').val("");
};
PX.outputHandler = function (data) {
    $('#output').val(JSON.stringify(data));
};

// Fixtures
PX.addFixturesHandler = function (e) {
    e.preventDefault();
    PX.clearOutput();
    PX.deleteEmployeesHandler();
    $.each(PX.fixtures, function() {
        $.post("/api/employees", this, function(data, textStatus, jqXHR) { 
            console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
            PX.outputHandler(data);
        });
    });
};

// Events

$('#add_fixtures').on('click', PX.addFixturesHandler);
$('#submit').on('click', PX.webserviceFormHandler);
$('#webservice').on('submit', PX.webserviceFormHandler);

// data

PX.fixtures = [
    {
      "id": 0,
      "firstname": "Max",  
      "lastname": "Mustermann",
      "position": "CEO"
    },
    {
      "id": 1,
      "firstname": "Maxime",
      "lastname": "Musterfrau",
      "position": "CEOine"
    }
];