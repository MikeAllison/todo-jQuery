$(document).ready(function() {
	
	//Bind click event handler to add button
	$("#add-task-btn").bind("click", addTask);
	
	//FUNCTIONS
	function addTask() {
		//Store text entered into text input field
		var taskTextVal = $("#add-task-text").val().trim();
		
		//Check for empty string
		if (taskTextVal !== '') {
			var taskListItem = "<li>";
			taskListItem += "<input type='checkbox' class='checkbox'>";
			taskListItem += "<label class='item'>" + taskTextVal + "</label>";
			taskListItem += "<button class='edit'>Edit</button>";
			taskListItem += "<button class='delete'>Delete</button>";
			taskListItem += "</li>";
			
			//Append new item to incomplete list
			$("#incomplete-list").append(taskListItem);
			
			//Bind click event handler to checkbox, edit button, and delete button
			$(".checkbox").bind("click", changeStatus);
			$(".edit").bind("click", editListItem);
			$(".delete").bind("click", deleteListItem);
			
			//Clear the text input
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
		//Store list item value from label
		var taskValue = $(this).siblings("label").text();
		$(this).siblings(".checkbox").prop("disabled", true);
		$(this).siblings("label").replaceWith("<input type='text' class='item-editing' value='" + taskValue + "'>");
		$(this).text("Save");
		$(this).bind("click", saveListItem);
	};
	
	function saveListItem() {
		//Store list item value from text input
		var taskValue = $(this).siblings(".item-editing").val();
		$(this).siblings(".checkbox").prop("disabled", false);
		$(this).text("Edit");
		$(this).bind("click", editListItem);
		$(this).siblings(".item-editing").replaceWith("<label class='item'>" + taskValue + "</label>");
	};
	
	function deleteListItem() {
		$(this).parent().remove();
	};
	
}); //End ready