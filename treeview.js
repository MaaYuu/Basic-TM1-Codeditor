$(document).ready(function () {
    
    ace.require("ace/ext/language_tools");
    var editor = ace.edit("editor");
    var editor2 = ace.edit("editor2");
    var editor3 = ace.edit("editor3");
    var editor4 = ace.edit("editor4");
    
    
    editor.setTheme("ace/theme/github");
    editor2.setTheme("ace/theme/github");
    editor3.setTheme("ace/theme/github");
    editor4.setTheme("ace/theme/github");

    editor.setOptions({
        enableLiveAutocompletion: true
    });
    editor2.setOptions({
        enableBasicAutocompletion: true
    });
    editor3.setOptions({
        enableBasicAutocompletion: true
    });
    editor4.setOptions({
        enableBasicAutocompletion: true
    });
    
    editor.getSession().setMode("ace/mode/tm1pro");
    editor2.getSession().setMode("ace/mode/tm1pro");
    editor3.getSession().setMode("ace/mode/tm1pro");
    editor4.getSession().setMode("ace/mode/tm1pro");

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        //$('#code-body').toggleClass('active');

    });

    $(".search-input").keyup(function () {
        var searchString = $(this).val();
        $('#SimpleJSTree').jstree('search', searchString);
    });
    
    let url_log = "http://localhost:5895/api/v1/Servers";

    //url_base = "http://localhost:" + httpport + "/api/v1/Processes";
    url_base1 = "http://localhost:" + "8014" + "/api/v1/Processes";
    url_base2 = "http://localhost:" + "12354" + "/api/v1/Processes";
    var url_pros = "?$filter=not(startswith(Name, '}'))";
    url1 = url_base1 + url_pros
    url2 = url_base2 + url_pros


    var objs1 = [
        { "id": "parent", "parent": "#", "text": "Processes1", "type": "process" }
    ]
    var objs2 = [
        { "id": "parent", "parent": "#", "text": "Processes2", "type": "process" }
    ]
    
    //First Tree
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
            

        }).on('changed.jstree', function (e, data) {
                r = data.instance.get_node(data.selected).text    
            if (r !== "Processes") {
                $.ajax({
                    async: true,
                    type: "GET",
                    //url: url_base + "('" + r[0] + "')",
                    url: url_base1 + "('" + r + "')",
                    dataType: "json",
                    //headers: headers,
                     xhrFields: {
                        withCredentials: true
                    },
                    success: function (json) {
                        proprc = json.PrologProcedure
                        metaprc = json.MetadataProcedure
                        dataprc = json.DataProcedure
                        epiprc = json.EpilogProcedure
                        parametersprc = json.Parameters

                        editor.setValue(proprc)
                        editor2.setValue(metaprc)
                        editor3.setValue(dataprc)
                        editor4.setValue(epiprc)
                        
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert("The process is " + thrownError +'.Please refresh the page and relogin');
                    }
                });
            }
        })
    }

    $.ajax({
        async: true,
        type: "GET",
        url: url1,
        dataType: "json",
        //headers: headers, 
        xhrFields: {
            withCredentials: true
            },
        success: function (json) {
            $.each(json.value, function (key, value) {
                obj = {
                    ["id"]: (key + 1).toString(),
                    ["parent"]: "parent",
                    ["text"]: value.Name,
                    ["type"]: "process",
                    ["a_attr"]: { ["href"]: "#process" }
                }
                objs1.push(obj)
            })
            createJSTree(objs1);
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            
            alert(xhr.status);
            alert(thrownError);
        }
    });
    
    // 2nd Tree
    function createJSTree2(jsondata) {
        $('#SimpleJSTree2').jstree({
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
            

        }).on('changed.jstree', function (e, data) {
                r = data.instance.get_node(data.selected).text    
            if (r !== "Processes") {
                $.ajax({
                    async: true,
                    type: "GET",
                    //url: url_base + "('" + r[0] + "')",
                    url: url_base2 + "('" + r + "')",
                    dataType: "json",
                    //headers: headers,
                     xhrFields: {
                        withCredentials: true
                    },
                    success: function (json) {
                        proprc = json.PrologProcedure
                        metaprc = json.MetadataProcedure
                        dataprc = json.DataProcedure
                        epiprc = json.EpilogProcedure
                        parametersprc = json.Parameters

                        editor.setValue(proprc)
                        editor2.setValue(metaprc)
                        editor3.setValue(dataprc)
                        editor4.setValue(epiprc)
                        
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert("The process is " + thrownError +'.Please refresh the page and relogin');
                    }
                });
            }
        })
    }

    $.ajax({
        async: true,
        type: "GET",
        url: url2,
        dataType: "json",
        //headers: headers, 
        xhrFields: {
            withCredentials: true
            },
        success: function (json) {
            $.each(json.value, function (key, value) {
                obj = {
                    ["id"]: (key + 1).toString(),
                    ["parent"]: "parent",
                    ["text"]: value.Name,
                    ["type"]: "process",
                    ["a_attr"]: { ["href"]: "#process" }
                }
                objs2.push(obj)
            })
            createJSTree2(objs2);
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            
            alert(xhr.status);
            alert(thrownError);
        }
    });
    //});

    // MAIN SCREEN LOGIN BUTTON
    $("#login").click(function () {
        $("#servers option").remove();

        $.ajax({
            type: "GET",
            url: url_log,
            success: function (json) {
                $.each(json.value, function (key, item) {
                    $('#servers').append($('<option/>', {
                        value: item.HTTPPortNumber,
                        text: item.Name
                    }));
                })
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });

    // LOGIN SUBMIT
    $("#loginsubmit").click(function () {
        httpport = $('#servers option:selected').val();


        url_base = "http://localhost:" + httpport + "/api/v1/Processes";
        var url_pros = "?$filter=not(startswith(Name, '}'))";
        url = url_base + url_pros

        username = $('#username').val();
        password = $('#password').val();

        headers = {
            'Authorization': "Basic " + btoa(username + ":" + password)
        }
    });

    $("#delete").click(function () {
    })

    $("#deletesubmit").click(function () {
            
        $.ajax({
            //async: true,
            type: "DELETE",
            //url: url_base + "('" + r[0] + "')",
            url: url_base + "('" + r + "')",
            //data: JSON.stringify(exec_data),
            //contentType: "application/json",
            //dataType: 'json',
            headers: headers,
            success: function (json) {
                alert("The process is successfully deleted!!");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });

    $("#saveas").click(function () {

        $.ajax({
            async: true,
            type: "GET",
            //url: url_base + "('" + r[0] + "')",
            url: url_base + "('" + r + "')",
            dataType: "json",
            headers: headers,
            success: function (json_saveas) {
                $('#saveas_name').val(json_saveas.Name);
                $("#executesubmit_saveas").click(function () {
                    new_pro_name = $('#saveas_name').val();
                    json_saveas.Name = new_pro_name

                    json_saveas.PrologProcedure = editor.getValue()
                    json_saveas.MetadataProcedure = editor2.getValue()
                    json_saveas.DataProcedure = editor3.getValue()
                    json_saveas.EpilogProcedure = editor4.getValue()


                    
                    // Save first
                    $.ajax({
                    type: "POST",
                    //url: url_base + "('" + r[0] + "')",
                    url: url_base,
                    data: JSON.stringify(json_saveas),
                    contentType: "application/json",
                    dataType: 'json',
                    headers: headers,
                    success: function (json) {
                        var data_comp = {};
                        // Compile Saved one
                        $.ajax({
                            //async: true,
                            type: "POST",
                            //url: url_base + "('" + r[0] + "')/tm1.Compile",
                            url: url_base + "('" + r + "')/tm1.Compile",
                            data: JSON.stringify(data_comp),
                            contentType: "application/json",
                            dataType: 'json',
                            headers: headers,
                            success: function (json) {
                                if (typeof(json.value[0]) === 'object' ) {
                                    alert_comp = 'In '+ json.value[0].Procedure +', Line:' + json.value[0].LineNumber + ' has compile error:' + json.value[0].Message
                                    alert(alert_comp)
    
                                    if (confirm("Still do you want to save as the process?") == true) {
                                        alert('The new process is saved with compile errors!')
                                    } else {
                                        var return_data = {
                                            "PrologProcedure": proprc,
                                            "MetadataProcedure": metaprc,
                                            "DataProcedure": dataprc,
                                            "EpilogProcedure": epiprc
                                        }
                                        // Delete(return) if not wanted to save it
                                        $.ajax({
                                            
                                            type: "DELETE",
                                            url: url_base + "('" + r + "')",
                                            //data: JSON.stringify(return_data),
                                            //contentType: "application/json",
                                            //dataType: 'json',
                                            headers: headers,
                                            success: function (json) {
                                                //console.log("Buraya giriyor ve data return:" + data_return)
                                            },
                                            error: function (xhr, ajaxOptions, thrownError) {
                                                alert(xhr.status);
                                                alert(thrownError);
                                            }
                                        });
                                        alert('The new process is not saved!')
                                    }
    
                                } else {
                                    alert("The new process is saved successfully. Please refresh and relogin to edit it.")    
                                }
                                
                                
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert(xhr.status);
                                alert(thrownError);
                            }
                        });
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert(thrownError);
                    }
                });            
                })

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
            
        });
    });


                 
    $("#save").on("click", (function () {
        //var txt = $(".code-area").val()
        prox = editor.getValue();
        metax = editor2.getValue();
        datax = editor3.getValue();
        epix = editor4.getValue();

        
        var data = {
            "PrologProcedure": prox,
            "MetadataProcedure": metax,
            "DataProcedure": datax,
            "EpilogProcedure": epix
        }

        // Save before compile

        $.ajax({
            //async: true,
            type: "PATCH",
            //url: url_base + "('" + r[0] + "')",
            url: url_base + "('" + r + "')",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json',
            headers: headers,
            success: function (json) {
                var comp_data = {};
                //var comp_data = data;
                // Compile
                $.ajax({
                    //async: true,
                    type: "POST",
                    //url: url_base + "('" + r[0] + "')/tm1.Compile",
                    url: url_base + "('" + r + "')/tm1.Compile",
                    data: JSON.stringify(comp_data),
                    contentType: "application/json",
                    dataType: 'json',
                    headers: headers,
                    success: function (json) {
                        //console.log(json.value)
                        //console.log(typeof(json.value))
                        //console.log(json.value[0].Procedure)

                        if (typeof(json.value[0]) === 'object' ) {
                            alert_comp = 'In '+ json.value[0].Procedure +', Line:' + json.value[0].LineNumber + ' has compile error:' + json.value[0].Message
                            alert(alert_comp)

                            if (confirm("Still do you want to save the process?") == true) {
                                alert('The process is saved with compile errors!')
                            } else {
                                var data_return = {
                                    "PrologProcedure": proprc,
                                    "MetadataProcedure": metaprc,
                                    "DataProcedure": dataprc,
                                    "EpilogProcedure": epiprc
                                }
                                // Retur
                                $.ajax({
                                    //async: true,
                                    type: "PATCH",
                                    //url: url_base + "('" + r[0] + "')",
                                    url: url_base + "('" + r + "')",
                                    data: JSON.stringify(data_return),
                                    contentType: "application/json",
                                    dataType: 'json',
                                    headers: headers,
                                    success: function (json) {
                                        console.log("Buraya giriyor ve data return:" + data_return)
                                    },
                                    error: function (xhr, ajaxOptions, thrownError) {
                                        alert(xhr.status);
                                        alert(thrownError);
                                    }
                                });
                                alert('The process is not saved!')
                            }

                        } else {
                            alert("The process is saved successfully.")
/*                                 $.ajax({
                                //async: true,
                                type: "PATCH",
                                //url: url_base + "('" + r[0] + "')",
                                url: url_base + "('" + r + "')",
                                data: JSON.stringify(data),
                                contentType: "application/json",
                                dataType: 'json',
                                headers: headers,
                                success: function (json) {
                                    alert("The process is saved successfully.")
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    alert(xhr.status);
                                    alert(thrownError);
                                }
                            });
*/                            
                        }
                        
                        
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert(thrownError);
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });


    }));

    $("#execute").click(function () {
        $("#parameters label").remove();
        $("#parameters input").remove();
        //var exec_params = [];
        exec_params = [];
        
        //console.log(parametersprc)
        //console.log(typeof(parametersprc))
            $.each(parametersprc, function (key, item) {
            //var param_obj = {}
            param_obj = {}
            $('#parameters').append(
                '<label class="form-label required">' + item.Name + '('+ item.Type + ') - ' + item.Prompt + ' :' +'</label><input type="text" class="form-control" id="parvalue'+ key +'" value="' + item.Value + '"></input>'
            );
            
            
            param_obj["Name"] = item.Name
            param_obj["Value"] =  $('#parvalue'+key).val();
    
            $('#parvalue'+key).on("input", function(){
                param_obj["Value"] =  $('#parvalue'+key).val();
            });
            exec_params.push(param_obj)
        })
        
        //let exec_data = {"Parameters": exec_params}
        exec_data = {"Parameters": exec_params}
    

    });
    
    $("#executesubmit").click(function () {
        $.ajax({
            //async: true,
            type: "POST",
            //url: url_base + "('" + r[0] + "')/tm1.ExecuteWithReturn?$expand=*",
            url: url_base + "('" + r + "')/tm1.ExecuteWithReturn?$expand=*",
            data: JSON.stringify(exec_data),
            contentType: "application/json",
            dataType: 'json',
            headers: headers,
            success: function (json) {
                //if (json === undefined) {
                //    alert('The process is executed successfully')
                //} 
                //else {
                pro_message = 'The process has ' + json.ProcessExecuteStatusCode
                if (json.ErrorLogFile !== null) {
                    pro_message = pro_message + '. Please check the error file:' + json.ErrorLogFile.Filename
                }

                alert(pro_message)
                //}
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });

});



// login 
//});


