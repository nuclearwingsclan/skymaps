<form>
	<input class="query" name="query" placeholder="Поиск...">
	<div class="filters">
		<select class="region" name="region">
			<option value="">Все регионы</option>
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
	<label class="local">
		<input type="checkbox" name="local" value="true">
		На этой карте
	</label>
	<button type="submit">Найти</button>
</form>