---
layout: default
---

{% assign tag = "code" %}
{% assign tagged_posts = "" | split: "" %}
{% for post in site.posts %}
  {% if post.tags contains tag %}
    {% assign tagged_posts = tagged_posts | push: post %}
  {% endif %}
{% endfor %}


<section class="posts">
<h1>posts tagged with #<span class="accent">{{tag}}</span></h1>
<ul>
{% for post in tagged_posts %}
<li><a class="post" href="{{ post.url }}">{{ post.title }}</a><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%m-%d-%Y" }}</time></li>
{% endfor %}
</ul>
</section>

