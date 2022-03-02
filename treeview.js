let objs = [
    { "id": "parent", "parent": "#", "text": "Processes", "type":"process"}
        ]

let url_base = "http://localhost:8014/api/v1/Processes";
let url_pros = "?$filter=not(startswith(Name, '}'))";
url = url_base + url_pros
let headers = {
    'Authorization': "Basic " + btoa("admin"+ ":" +"apple")
}

$(function () {
    $.ajax({
        async: true,
        type: "GET",
        url : url,
        dataType: "json",
        headers: headers,
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


function createJSTree(jsondata) {            
    $('#SimpleJSTree').jstree({
        'core': {
            'data': jsondata
        },
        'plugins': ['types', 'search'],
        'types': {
            "process": {
                "icon": "./icons/process_icon_16.png"
            }
        },
        'search': {
            "case_sensitive": false,
            "show_only_matches": true
        }

    }).on('changed.jstree', function(e, data) {
        var i,j,r = [];
        for(i = 0, j = data.selected.length; i < j; i++) {
            r.push(data.instance.get_node(data.selected[i]).text);            
        }

        $.ajax({
            async: true,
            type: "GET",
            url : url_base + "('" + r[0] + "')",
            dataType: "json",
            headers: headers,
            success: function (json) {
                proprc = json.PrologProcedure
                metaprc = json.MetadataProcedure
                dataprc = json.DataProcedure
                epiprc = json.EpilogProcedure

                script = proprc + metaprc + dataprc + epiprc
                $('#loadOnClick').html(script);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

        $("#save").click(function () {
            var txt = $("#loadOnClick").val()
            //var txt = $("#loadOnClick").text()
            arr = txt.split("\n#****Begin: Generated Statements***\n#****End: Generated Statements****")
            x = "\n#****Begin: Generated Statements***\n#****End: Generated Statements****"
            prox = x + arr[1]
            metax = x + arr[2]
            datax = x + arr[3]
            epix = x + arr[4]

            //console.log(txt)
            

            var data = {
                "PrologProcedure": prox,
                "MetadataProcedure": metax,
                "DataProcedure": datax,
                "EpilogProcedure": epix
                }
            $.ajax({
                //async: true,
                type: "PATCH",
                url : url_base + "('" + r[0] + "')",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: 'json',
                headers: headers,
                success: function (json) {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        });

    })
}

    $(document).ready(function () {
        $(".search-input").keyup(function () {
            var searchString = $(this).val();
            $('#SimpleJSTree').jstree('search', searchString);
        });


    });