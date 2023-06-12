// ==UserScript==
// @name        Better Gatry
// @description Make Gatry great.
// @match       *://gatry.com/*
// ==/UserScript==

;(function betterGatry() {
	var script = document.createElement("script")
	script.type = "text/javascript"
	script.src =
		"https://website-thumbnail-gataquadrada.vercel.app/public/main.min.js"
	document.documentElement.appendChild(script)
})()
