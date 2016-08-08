<div class="results">
	<% if (typeof(maps) !== 'undefined' && maps.length) { %>
		<p class="intro">Найдено на картах:</p>
		<ul class="maps">
			<% _.each(maps, function(level) { %>
				<% var items = _.where(match, { region: level.region, map: level.map }); %>
				<li class="map">
					<label>
						<span class="caption"><%= level.caption %></span>
						<span class="total">(<%= items.length %>)</span>
					</label>
					<ul class="items">
						<% _.each(items, function(item) {
							var x = Math.round((item.x / level.w) * 100);
							var y = Math.round((item.y / level.h) * 100); 
						%>
							<li>
								<div class="item <%= item.type %>" data-region="<%= level.region %>" data-level="<%= level.map %>" data-x="<%= item.x %>" data-y="<%= item.y %>">
									<span class="caption"><%= item.caption %></span>
									<span class="coordinates">[<%= x %>:<%= y %>]</span>
								</div>
							</li>
						<% }); %>
					</ul>
				</li>
			<% }); %>
		</ul>
	<% } else { %>
		<p class="intro">Ничего не найдено.</p>
	<% } %>
	<button class="back">Назад к поиску</button>
</div>
