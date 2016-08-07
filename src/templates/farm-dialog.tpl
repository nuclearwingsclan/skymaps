<div class="farm">
	<% if (typeof(drop) !== 'undefined' && drop.length) { %>
		<% _.each(drop, function(item) { %>
			<img src="/img/resources/item_<%= item.type %>_<%= item.subtype %>.jpg" data-caption="<%= item.caption %>">
		<% }); %>
	<% } else { %>
		<p>На этой карте ничего не добывается.</p>
	<% } %>
</div>