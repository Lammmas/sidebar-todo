function save(value) {
	localStorage.setItem("sidebar-todo", JSON.stringify(value));
}

function load() {
	var value = localStorage.getItem("sidebar-todo");

	if (!value) return value;

	return JSON.parse(value);
}

var items = load();

function display(items) {
	var content = $('#items');

	if (!items || items.length < 1) content.html("No todo items yet");
	else {
		var text = "";

		for (var i = 0; i < items.length; i++) {
			text += "<div class=\"row\">";
			text += "<label class=\"item u-pull-left\" data-id=\"" + i;
			text += "\"><input type=\"checkbox\" ";
			if (items[i].done == true) text += "checked";
			text += "><span class=\"label-body\">";
			text += items[i].text + "</span></label>";
			text += "<a class=\"remove u-pull-right\" data-id=\"" + i + "\">x</a>";
			text += "</div>"
		}

		content.html(text);

		$(".item").each(function () {
			$(this).click(function() {
				toggle($(this).data("id"));
			});
		});

		$(".remove").each(function () {
			$(this).click(function() {
				remove($(this).data("id"));
			});
		});
	}

	if (items && items.length > 0) {
		var done = 0;

		for (var i = 0; i < items.length; i++) {
			if (items[i].done == true) done++;
		}

		opr.sidebarAction.setBadgeText({"text": done + " / " + items.length});
	} else opr.sidebarAction.setBadgeText({"text": ""});
}

function add() {
	// We don't want to create multiple input fields
	if ($('#create').length) return;

	var content = $("#items");

	var text = "<form id=\"create\"><input type=\"text\" placeholder=\"Item text\" id=\"new\" class=\"u-full-width\" /></form>";

	content.append(text);

	var newfield = $("#new");
	newfield.focus();

	$("#create").on("submit", function (e) {
		e.preventDefault();
		if (!items) items = [];

		items.push({"text": newfield.val(), "done": false});
		save(items);
		display(items);

		$("#create").remove();
	});
}

function remove(id) {
	if (id > -1) items.splice(id, 1);
	save(items);
	display(items);
}

function toggle(id) {
	if (id > -1) items[id]["done"] = !items[id]["done"];
	save(items);
	display(items);
}

document.addEventListener("DOMContentLoaded", function(event) {
	display(items);

	$("#add").click(add);
});
