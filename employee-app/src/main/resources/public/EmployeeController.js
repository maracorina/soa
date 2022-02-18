
var server = "/";

function search (){
    var searchTerm = $("#searchText").val().trim();
    if (searchTerm != "") {
        $("#people").show();
        $("#people").html("SEARCHING...");
        $.ajax({
            url: server + "employees/" +
                $("#searchType").val() + "/" +
                encodeURIComponent(searchTerm),
            method: "GET"
        }).done(
            function(data) {
                $("#people").empty();
                $("#people").hide();
                if (data.length == 0) {
                    $("#people").html("");
                    $("#notFound").show();
                    $("#notFound").html("No people found matching your search criteria");
                    $("#articles").html("");
                    $("#articles").hide();
                    $("#articleNotFound").hide();
                    $("#articleDetail").hide();
                } else {
                    $("#articles").hide();
                    $("#articleNotFound").hide();
                    $("#articleDetail").hide();
                    showResults(data);
                }
                $("#people").show(400, "swing");
            });
    } else {
        loadEmployees();
    }
}

function searchPost() {
    var searchTerm = $("#postSearchText").val().trim();
    $("#notFound").hide();
    $("#articleNotFound").hide();
    $("#employeeForm").hide();
    $("#editForm").hide();
    $("#deleteButton").hide();
    $("#home").hide();
    $("#people").hide();
    $("#posts").hide();
    $("#articles").hide();
    $("#posts").show();
    $("#articles").show();
    $("#articles").html("LOADING...");
    $.ajax({
        dataType: "json",
        url: server + "articles",
        method: "GET"
    }).done(function(data) {
        showFilteredPostsResults(data, searchTerm);
        $("#articles").show(400, "swing");
    });
}

$(function() {
    $("#searchText").on("keyup", function(e) {
        if (e.keyCode == 13) {
            search ();
        }
    });
});

function showResults(data){
    $("#people").hide();
    $("#people").empty();
    $("#notFound").hide();
    data.forEach(function(employee) {
        var item = $(renderEmployees(employee));
        $("#people").append(item);
    });
}

function showPostsResults(data){
    $("#articles").hide();
    $("#articles").empty();
    $("#articleNotFound").hide();
    data.forEach(function(post) {
        var item = $(renderPosts(post));
        item.on("click", function() {
            var detailItem = $(renderDetailPost(post));
            $("#posts").hide();
            $("#articleDetail").empty();
            $("#articleNotFound").hide();
            $("#articleDetail").append(detailItem);
            $("#articles").hide(
                400,
                "swing",
                function() {
                    $("#articleDetail").show()
                });
        });
        $("#articles").append(item);
    });
}

function showFilteredPostsResults(data, term){
    $("#articles").hide();
    $("#articles").empty();
    $("#articleNotFound").hide();
    data.forEach(function(post) {
        debugger
        var item = $(renderPosts(post));
        if(fitsPosts(post, term)) {
            item.on("click", function () {
                var detailItem = $(renderDetailPost(post));
                $("#posts").hide();
                $("#articleDetail").empty();
                $("#articleNotFound").hide();
                $("#articleDetail").append(detailItem);
                $("#articles").hide(
                    400,
                    "swing",
                    function () {
                        $("#articleDetail").show()
                    });
            });
            $("#articles").append(item);
        }
    });
}

function showEmployeeForm() {
    $("#notFound").hide();
    $("#articleNotFound").hide();
    $("#editForm").hide();
    $("#deleteButton").hide();
    $("#employeeForm").show();
    $("#formTitle").text("Add Post");
    $("#home").hide();
    $("#people").hide();
    $("#posts").hide();
    $("#articles").hide();
}

function loadEmployees() {
    $("#notFound").hide();
    $("#searchText").val("");
    $("#employeeForm").hide();
    $("#editForm").hide();
    $("#home").show();
    $("#people").show();
    $("#people").html("LOADING...");
    $.ajax({
        dataType: "json",
        url: server + "employees",
        method: "GET"
    }).done(function (data) {
        showResults(data);
        $("#people").show(400, "swing");
    });
}
function loadPosts() {
        $("#notFound").hide();
        $("#articleNotFound").hide();
        $("#employeeForm").hide();
        $("#editForm").hide();
        $("#deleteButton").hide();
        $("#home").hide();
        $("#people").hide();
        $("#posts").hide();
        $("#articles").hide();
        $("#posts").show();
        $("#articles").show();
        $("#articles").html("LOADING...");
        $.ajax({
            dataType: "json",
            url: server + "articles",
            method: "GET"
        }).done(function(data) {
            showPostsResults(data);
            $("#articles").show(400, "swing");
        });
}


function renderEmployees(employee){
    var template = $('#employees_tpl').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, {
        "firstName" : employee.firstName,
        "lastName" : employee.lastName,
        "title" : employee.title,
        "department" : employee.department
    });
    return rendered;
}

function renderPosts(post){
    var template = $('#employees_tpl').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, {
        "title" : post.title,
        "text" : post.body
    });
    return rendered;
}


function fitsPosts(post, searchTerm){
    var template = $('#employees_tpl').html();
    Mustache.parse(template);
    debugger
    return post.title.includes(searchTerm);
}

function renderDetailEmployee(employee){
    var template = $('#detail_tpl').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template,{
        "id" : employee.id,
        "firstName" : employee.firstName,
        "lastName" : employee.lastName,
        "email" : employee.email,
        "birthDate" : employee.birthDate,
        "phone" : employee.phone,
        "title" : employee.title,
        "department" : employee.department
    });
    return rendered;
}

function renderDetailPost(post){
    var template = $('#detail_tpl').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template,{
        "title" : post.title,
        "body" : post.body
    });
    return rendered;
}

function save() {
    var post = {
        id: "",
        title: $("#title").val(),
        body: $("#body").val(),
        userId: ""
    };
    $.ajax({
        url: server + "articles",
        method: "POST",
        data: JSON.stringify(post)
    }).done(function(data) {
        $("#articleDetail").hide();
        $("#title").val("");
        $("#body").val("");
        loadPosts();
    });

}

function updatePost() {
    var post = {
        title: $("#editTitle").val(),
        body: $("#editTexte").val()
    };
    $("#articleDetail").html("UPDATING...");
    $("#articleDetail").hide();
    loadPosts()
}

function deletePost() {
    var employee = {
        firstName: $("#editFirstName").val(),
        lastName: $("#editLastName").val(),
        id: $("#editId").val()
    };
    $('<div></div>').dialog({
        modal: true,
        title: "Confirm Delete",
        open: function() {
            var markup = 'Are you sure you want to delete post?';
            $(this).html(markup);
        },
        buttons: {
            Ok: function() {
                $("#articleDetail").html("DELETING...");
                $(this).dialog("close");
                loadPosts()
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });

}
