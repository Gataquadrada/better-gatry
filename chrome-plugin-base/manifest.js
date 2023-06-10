// manifest.js
{
	"name": "Better Gatry",
	"version": "0.0.3",
	"description": "Ajustes na experiência Gatry.",
	"manifest_version": 3,
	"action": {
		"default_title": "Clique para melhorar o gatry"
	},
	"permissions": ["activeTab", "scripting"],
		"background": {
		"service_worker": "background.js"
	},
	"icons": {
		"48": "logo.png",
		"128": "logo.png"
	}
}