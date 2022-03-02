//let process
let process_url = "http://localhost:8014/api/v1/Processes(" +


$(function () {
    $.ajax({
        async: true,
        type: "GET",
        url : url,
        dataType: "json",
        headers: {
            'Authorization': "Basic " + btoa("admin"+ ":" +"apple")
        },
        success: function (json) {
            $.each(json.value, function(key,value) {
                obj = {
                    ["id"]: (key+1).toString(),
                    ["parent"]: "parent",
                    ["text"]: value.Name,
                    ["type"]: "process",
                    ["a_attr"]: {["href"] : "#process"}
                }
                objs.push(obj)

            })

            createJSTree(objs);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });            
});