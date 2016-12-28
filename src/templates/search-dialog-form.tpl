<form>
	<input class="query" name="query" placeholder="Поиск...">
	<div class="filters">
		<select class="region" name="region">
			<% if (typeof(regions) !== 'undefined' && regions.length) { %>
				<% _.each(regions, function(item) { %>
					<option value="<%= item.id %>"><%= item.caption %></option>
				<% }); %>
			<% } %>
		</select>
		<select class="class" name="class">
			<option value="">Любой объект</option>
			<% if (typeof(objects) !== 'undefined' && objects.length) { %>
				<% _.each(objects, function(item) { %>
					<option value="<%= item.id %>"><%= item.caption %></option>
				<% }); %>
			<% } %>
		</select>
	</div>
	<label class="keywords">
		<input type="checkbox" name="use_keywords" value="true" checked>
		Распознавание классов
	</label>
	<button class="submit" type="submit">Найти</button>
</form>