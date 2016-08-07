<div class="farm">
	<% if (typeof(drop) !== 'undefined') { %>
		<% _.each(drop, function(item) { %>
			<img src="/img/resources/item_<%= item.type %>_<%= item.subtype %>.jpg" data-caption="<%= item.caption %>">
		<% }); %>
	<% } %>
</div>