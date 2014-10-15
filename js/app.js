$(document).ready(function() {
	$("#add-task-btn").bind("click", addTask);
	$("#add-task-text").keydown(function(e) {
		if (e.keyCode == 13) {
			addTask();
		};
	});
	
	
	
	function addTask() {
		var taskTextVal = $("#add-task-text").val().trim();
		
		if (taskTextVal !== '') {
			var taskListItem = "<li>";
			taskListItem += "<input type='checkbox' class='checkbox'>";
			taskListItem += "<label class='item'>" + taskTextVal + "</label>";
			taskListItem += "<button class='edit'>Edit</button>";
			taskListItem += "<button class='delete'>Delete</button>";
			taskListItem += "</li>";
			
			$("#incomplete-list").append(taskListItem);
			
			$(".checkbox").bind("click", changeStatus);
			$(".edit").bind("click", editListItem);
			$(".delete").bind("click", deleteListItem);
			
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
		$(this).siblings(".checkbox").prop("disabled", true);
		$(this).siblings("label").replaceWith("<input type='text' class='item-editing' value='" + taskValue + "'>");
		$(this).text("Save");
		$(this).bind("click", saveListItem);
	};
	
	function saveListItem() {
		var taskValue = $(this).siblings(".item-editing").val();
		$(this).siblings(".checkbox").prop("disabled", false);
		$(this).siblings(".item-editing").replaceWith("<label class='item'>" + taskValue + "</label>");
		$(this).text("Edit");
		$(this).bind("click", editListItem);
	};
	
	function deleteListItem() {
		$(this).parent().remove();
	};
	
}); //End ready