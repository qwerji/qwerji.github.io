---
layout: page
title: posts
---

<section class="posts">

<!-- search -->
<style>
	#search-container {
	    max-width: 100%;
	}

	input[type=text] {
		font-size: normal;
	    outline: none;
	    padding: 1rem;
		background: rgb(236, 237, 238);
	    width: 100%;
		-webkit-appearance: none;
		font-family: inherit;
		font-size: 100%;
		border: none;
	}
	#results-container {
		margin: .5rem 0;
	}
</style>

<!-- Html Elements for Search -->
<div id="search-container">
<input type="text" id="search-input" placeholder="Search" autofocus />
<ol id="results-container"></ol>
</div>

<!-- Script pointing to search-script.js -->
<script src="/assets/search/search.js" type="text/javascript"></script>

<!-- Configuration -->
<script type="text/javascript">
const search = SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/assets/search/search.json',
  searchResultTemplate: '<li><a href="{url}" title="{description}">{title}</a><time datetime="{date}">{pretty-date}</time></li>',
  noResultsText: 'No results found',
  limit: 20,
  fuzzy: false,
  exclude: []
});
</script>
<!-- end search -->

<ul id="posts-container">
{% for post in site.posts %}
<li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%m-%d-%Y" }}</time></li>
{% endfor %}
</ul>

<p class="tags">tags: 
{% for tag in site.tags %}
  {% assign t = tag | first %}
  <a href="/tag/{{t}}">{{t}}</a>
{% endfor %}
</p>
</section>

<script src="/assets/search/custom-search.js" type="text/javascript"></script>
