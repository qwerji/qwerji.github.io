---
layout: post
title: interest calculator
description: Simple interest calculator.
summary: Simple interest calculator.
tags: ["code", "daily-programmer"]
---
<form class="calculator">
<input type="text" name="principal" placeholder="Principal ($)" class="principal blocked" style="display: block;" />
<input type="text" name="rate" placeholder="Rate (%/year)" class="rate blocked" style="display: block;" />
<input type="text" name="time" placeholder="Time" class="time" />
<select name="time-units" class="time-units">
<option value="days">Days</option>
<option value="weeks">Weeks</option>
<option value="months">Months</option>
<option value="years" selected>Years</option>
</select>
<div>
<input type="checkbox" name="add-principal" class="add-principal">
<label for="add-principal">+Principal</label>
</div>
</form>
<p class="answer">Total Accrued Amount: $<span>0.00</span></p>
<script src="/assets/interest-calc/script.js"></script>
