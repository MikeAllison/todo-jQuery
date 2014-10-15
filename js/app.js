$(document).ready(function() {
	
	//Bind click event handler to add button
	$("#add-task-btn").bind("click", addTask);
	
	//FUNCTIONS
	function addTask() {
		var taskTextVal = $("#add-task-text").val();
		
		if (taskTextVal !== '') {
			var taskListItem = "<li>";
			taskListItem += "<input type='checkbox' class='checkbox'>";
			taskListItem += "<label class='item'>" + taskTextVal + "</label>";
			taskListItem += "<button class='edit'>Edit</button>";
			taskListItem += "<button class='delete'>Delete</button>";
			taskListItem += "</li>";
			
			//Append new item to incomplete list
			$("#incomplete-list").append(taskListItem);
			
			//Bind click events to checkbox
			$(".checkbox").bind("click", changeStatus);
			$(".delete").bind("click", deleteListItem);
			$(".edit").bind("click", editListItem);
			
			//Clear the textbox
			$("#add-task-text").val('').removeClass("error");
		} else {
			taskTextVal = "Please enter a task!";
			$("#add-task-text").val(taskTextVal).addClass("error");
		};
	};
	
	function changeStatus() {
		var taskListItem = $(this).parent();
		var checkboxStatus = $(this).prop("checked");
		
		if (checkboxStatus === true) {
			$("#completed-list").append(taskListItem);
		} else {
			$("#incomplete-list").append(taskListItem);
		}
	};
	
	function editListItem() {
		var taskValue = $(this).siblings("label").text();
		$(this).siblings("label").replaceWith("<input type='text' class='edit-item' value='" + taskValue + "'>");
		$(this).siblings(".checkbox").prop("disabled", true);
		$(this).text("Save");
		$(this).bind("click", saveListItem);
	};
	
	function saveListItem() {
		var taskValue = $(this).siblings(".edit-item").val();
		$(this).siblings(".checkbox").prop("disabled", false);
		$(this).text("Edit");
		$(this).bind("click", editListItem);
		$(this).siblings(".edit-item").replaceWith("<label class='item'>" + taskValue + "</label>");
	};
	
	function deleteListItem() {
		$(this).parent().remove();
	};
	
}); //End ready