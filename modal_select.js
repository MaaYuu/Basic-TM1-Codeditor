let headers = {
    'Authorization': "Basic " + btoa("admin"+ ":" +"apple")
}

let url = "http://localhost:5895/api/v1/Servers";


$("#login").click(function () {
    $("#servers option").remove();

    $.ajax({
    type: "GET",
    url : url,
    //data: JSON.stringify(data),
    //contentType: "application/json",
    //dataType: 'json',
    //headers: headers,
    success: function (json) {
        console.log(json)
    },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        }
    });
});