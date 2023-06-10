// ==UserScript==
// @name        Better Gatry
// @description Make Gatry great.
// @match       *://gatry.com/*
// ==/UserScript==

{
	// Version, duh.
	const BTTG_VERSION = "0.0.3"

	// A bit of art for you nerds.
	// Open with CTRL+SHIT+I (or CMD+Option+I).
	console.log(
		"%c%s",
		"background:#ff3375;color:#ffffff",
		`   ___   _ _____ _____   __   
  / __| /_\\_   _| _ \\ \\ / /   
 | (_ |/ _ \\| | |   /\\ V /    
  \\___/_/ \\_\\_| |_|_\\ |_|     
                              `
	)

	console.log(
		"%c%s",
		"color:#ff3375",
		`      ...but better! (v${BTTG_VERSION})`
	)

	// *Verified users.
	// Want to be one?
	// Don't be an asshat.
	const BTTG_VERIFIED = { gatry: "admin" }

	try {
		fetch(
			"https://cdn.jsdelivr.net/gh/Gataquadrada/better-gatry@latest/verified-users.json"
		).then((response) => {
			response.json().then((jsonData) => {
				jsonData.users.forEach((u) => {
					if ("gatry" !== u.user) {
						BTTG_VERIFIED[u.user] = u.badge
					}
				})
			})
		})
	} catch (err) {
		console.log("Not possible to use the fetch() API...")
	}

	// *Default settings.
	const bttgMySettings = {
		helped: false,
		darkmode: true,
		users: [],
	}

	// Dark mode styles.
	const bttgDarkModeStyles = `<style id="bttg-dark-mode">
		:root{
			--bttg-color-bg: #222831;
			--bttg-color-fg: #393E46;
			--bttg-color-bc: #343a40;
			--bttg-color-fc: #cccccc;
		}
		:root.bttg-dark-mode body{
			--fancybox-content-bg: var(--bttg-color-fg);
			--fancybox-content-color: var(--bttg-color-fc);
		}
		.bttg-btn-dark-mode{
			background: #f27474;
		}
		.bttg-dark-mode .bttg-btn-dark-mode{
			background: #495057;
		}
		.bttg-dark-mode .bttg-btn-dark-mode .bttg-is-sun,
		.bttg-btn-dark-mode .bttg-is-moon{
			display: none;
		}
		.bttg-btn-dark-mode .bttg-is-sun,
		.bttg-dark-mode .bttg-btn-dark-mode .bttg-is-moon{
			display: inline-block;
		}
		.bttg-dark-mode body{
			background: var(--bttg-color-bg);
			color: var(--bttg-color-fc);
		}
		.bttg-dark-mode .top-bar{
			background: var(--bttg-color-bg);
		}
		.bttg-dark-mode .top-bar .menu ul li a {
			color: var(--bttg-color-fc);
		}
		.bttg-dark-mode .top-bar .header,
		.bttg-dark-mode .top-bar .header .wrapper-header .share,
		.bttg-dark-mode .top-bar .menu{
			border-color: var(--bttg-color-bc);
		} 
		.bttg-dark-mode .comments{
			border-radius: 10px;
			overflow: hidden;
		}
		.bttg-dark-mode .page .no-data, 
		.bttg-dark-mode .comments .comment, 
		.bttg-dark-mode .comments.comments-user .comment .comment-wrapper{
			background: var(--bttg-color-fg);
			border-color: var(--bttg-color-bc);
		}
		.bttg-dark-mode .comments .comment .comment-header a{
			color: #eeeeee;
		}
		.bttg-dark-mode .comments .comment .comment-header .comment-time b{
			background: rgba(50 100 150 / 0.4);
		}
		.bttg-dark-mode .btn-criar-alerta{
			background: var(--bttg-color-fg);
			font-size: 0;
			width: 30px;
		}
		.bttg-dark-mode .search-bar{
			background: var(--bttg-color-fg);
			border-color: var(--bttg-color-fg);
			border-radius: 10px;
		}
		.bttg-dark-mode .search-bar [type="text"]{
			background: none;
			color: #fff;
		}
		.bttg-dark-mode .promotions article{
			background: var(--bttg-color-fg);
			border-radius: 10px;
			color: var(--bttg-color-fc);
		}
		.bttg-dark-mode .promotions article .description h3 a{
			color: #ccc;
		}
		.bttg-dark-mode .promotions article .description .price,
		.bttg-dark-mode .promotions article .options .option-other p, 
		.bttg-dark-mode .promotions article .image p{
			color: #ccc;
		}
		.bttg-dark-mode .promotions article .image img{
			filter: contrast(1);
			mix-blend-mode: multiply;
		}
		.bttg-dark-mode .load-more button{
			background: var(--bttg-color-fg);
			border-radius: 10px;
			color: var(--bttg-color-fc);
		}
		.bttg-dark-mode footer{
			background: var(--bttg-color-bg);
		}
		.bttg-dark-mode .tribute-container ul{
			background: var(--bttg-color-bg);
			border-color: var(--bttg-color-bg);
		}
		.bttg-dark-mode .tribute-container ul .highlight{
			background: var(--bttg-color-bc);
		}
		.comments .comment .comment-wrapper:hover .comment-header [data-bttg-user-block] {
			display: block !important;
		}
		</style>`

	document.head.innerHTML += bttgDarkModeStyles

	try {
		var mySettings = JSON.parse(
			localStorage.getItem("bttg_mysettings") ?? JSON.stringify({})
		)

		mySettings = {
			...{
				helped: false,
				darkmode: true,
				users: [],
			},
			...mySettings,
		}

		// I'm a redundant coder.
		// Check twice. Code thrice. Zero the log.
		// Sue me.
		bttgMySettings.helped = mySettings.helped
		bttgMySettings.darkmode = mySettings.darkmode
		bttgMySettings.users = mySettings.users
	} catch (err) {
		console.error(err)
	}

	// *Utils (set as const so it's impossible to rewrite)
	// Always use getters and setters, kids.
	const bttgSettingsGet = () => {
		return bttgMySettings
	}

	// Settings handler.
	const bttgSettingsUpdate = (
		{
			helped = null,
			darkmode = null,
			users = null,
			_callback = () => {},
			autosave = false,
		} = {
			helped: null,
			darkmode: null,
			users: null,
			_callback: () => {},
			autosave: false,
		}
	) => {
		bttgMySettings.helped = helped !== null ? helped : bttgMySettings.helped
		bttgMySettings.darkmode =
			darkmode !== null ? darkmode : bttgMySettings.darkmode
		bttgMySettings.users = users !== null ? users : bttgMySettings.users

		if (autosave) {
			bttgSettingsSave({
				_callback: _callback(),
			})
		} else {
			_callback()
		}
	}

	// Some browsers crash the Local Storage if you keep updating this data too often.
	// Go figure...
	const bttgSettingsSave = (
		{ _callback = () => {} } = { _callback: () => {} }
	) => {
		localStorage.setItem("bttg_mysettings", JSON.stringify(bttgMySettings))
	}

	// Return blocked users
	const bttgUsersBlockedGet = () => {
		return bttgSettingsGet().users
	}

	// Blocking an user.
	// It's just an array, really.
	const bttgUserBlock = (user = "") => {
		const myBlocked = bttgUsersBlockedGet()
		myBlocked.push(user)

		bttgSettingsUpdate({
			users: [...new Set(myBlocked)],
			autosave: true,
			_callback: () => {
				bttgUsersFilter()
			},
		})
	}

	// Blocking an user.
	// It's just an array, really [2].
	const bttgUserUnblock = (user = "") => {
		var myBlocked = bttgUsersBlockedGet()

		myBlocked = myBlocked.filter(function (u) {
			return u !== user
		})

		bttgSettingsUpdate({
			users: [...new Set(myBlocked)],
			autosave: true,
			_callback: () => {
				// Gives the browser time to do it's thing.
				// Trust me, this is needed.
				// You have no idea of how many bugs are shipped with browsers...
				setTimeout(() => {
					console.log("Bye!")
					window.location.reload()
				}, 1000)
			},
		})
	}

	// Darkmode on
	const bttgDarkmodeOn = () => {
		// It's vanilla so Javascript will process it instantly.
		document.getElementsByTagName("html")[0].classList.add("bttg-dark-mode")
	}

	// Darkmode off
	// !Unused
	const bttgDarkmodeOff = () => {
		// It's vanilla so Javascript will process it instantly [2].
		document
			.getElementsByTagName("html")[0]
			.classList.remove("bttg-dark-mode")
	}

	// This name should be more intuitive.
	const bttgUsersFilter = () => {
		const myBlocked = bttgUsersBlockedGet()

		$(`.comment-wrapper`).each(function () {
			const comment = $(this)
			const commentHeader = comment.find(`.comment-header`).first()
			const profileLink = commentHeader.find(`a`).attr(`href`).toString()
			const profileAt = profileLink
				.toString()
				.toLowerCase()
				.split("/")
				.slice(-1)[0] // In case you're wondering, toString() is there to prevent types crash.

			// It makes sense to me that, uppon inspecting their profile, you should actually see everything they said.
			if (
				myBlocked.includes(profileAt) &&
				!window.location.href
					.toString()
					.toLowerCase()
					.includes(`detalhe/${profileAt}`)
			) {
				comment.parent().remove()
				return null
			}

			// If this comment has a block button already, don't do anything else.
			// The bug the absence of this line was creating was hilarious, tho.
			if (comment.find(`[data-bttg-user-block]`).length) return null

			const blockUserButton = $(`<a>`, {
				href: "#",
				"data-bttg-user-block": profileAt,
				css: {
					color: "coral", // a bUtToN, CORAL!
					float: "right", // Bet you don't get memes...
					"margin-left": "7px", // ...or bitches
					display: "none",
				},
				html: `<i class="fa fa-ban"></i>`,
			}).on("click", function (e) {
				e.stopImmediatePropagation()
				e.preventDefault()

				// Really, dude?
				if ("desireeoficial" == profileAt) {
					alert("Eu crio o script e você tenta usar contra mim?")
					alert("Imbecil.")
					return null
				}

				bttgUserBlock(profileAt)
			})

			const commentReportArea = comment.find(`.comment-report`)
			blockUserButton.insertBefore(commentReportArea)

			// Verified badge.
			if (BTTG_VERIFIED[profileAt]) {
				const badge = $(`<img>`, {
					src: `https://cdn.jsdelivr.net/gh/Gataquadrada/better-gatry@latest/assets/badge_${BTTG_VERIFIED[profileAt]}.png`,
					css: {
						height: "15px",
						width: "15px",
					},
				}).insertBefore(commentHeader.find(".text-gray").first())
			}
		})
	}

	// Downloading settings.
	const bttgSettingsDownload = () => {
		var e = document.createElement("a")
		e.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," +
				encodeURIComponent(JSON.stringify(bttgSettingsGet()))
		)
		e.setAttribute("download", "settings.bttg")
		e.style.display = "none"
		document.body.appendChild(e)
		e.click()
		document.body.removeChild(e)
	}

	// Uploading settings.
	// Yeah, we're that advanced, now.
	const bttgSettingsUpload = () => {
		return new Promise((resolve, reject) => {
			if ("undefined" != typeof FileReader) {
				const input = $("<input/>", {
					type: "file",
					accept: ".bttg",
				})

				input.on("change", function () {
					const fInput = $(this)
					const fReader = new FileReader()

					fReader.onload = function (e) {
						try {
							const myNewSettings = JSON.parse(e.target.result)
							resolve(myNewSettings)
						} catch (err) {
							reject(
								"Não foi possível carregar suas configurações..."
							)
						}
					}

					fReader.readAsText(fInput[0].files[0])
				})

				input.trigger("click")
			} else {
				alert(
					"Your system doesn't support offline file manipulation..."
				)
			}
		})
	}

	// *After we declared everything, we start using
	if (bttgMySettings.darkmode) {
		bttgDarkmodeOn()
	}

	// Once the page is ready (and Mr.G's code ran), do our thing.
	window.addEventListener("load", () => {
		// Buttons area at the top of the page.
		const bttgArea = $(`<div>`, {
			css: {
				"align-items": "center",
				display: "flex",
				"flex-direction": "column",
				gap: "5px",
				"justify-content": "center",
			},
		}).appendTo($(`section.top-bar .header .container .wrapper-header`))

		// Settings button (redesigned).
		const bttgBtnSettings = $(`<a>`, {
			href: "#",
			css: {
				"align-items": "center",
				background: "#ff338b",
				"border-radius": "100%",
				color: "white",
				display: "flex",
				"font-size": "13px",
				height: "20px",
				"justify-content": "center",
				opacity: ".9",
				width: "20px",
			},
		})
			.on("click", function (e) {
				e.stopImmediatePropagation()
				e.preventDefault()

				// This is a hack.
				// Mr.G didn't update his SweetAlert to the latest version...
				const timer = setInterval(() => {
					if (
						$(`[data-bttg-settings-window-container]`).is(
							":visible"
						)
					) {
						// Settings window (redesigned).
						const bttgSettingsWindow = $(`<div>`, {
							"data-bttg-settings-window": true,
						}).appendTo($(`[data-bttg-settings-window-container]`))

						bttgSettingsWindow.on(
							"click",
							`[data-bttg-tab]`,
							function (e) {
								e.stopImmediatePropagation()
								e.preventDefault()
								$(`[data-bttg-tab]`).removeClass("active")
								$(this).addClass("active")
								$(`[data-bttg-tab-content]`).addClass("d-none")
								$(
									`[data-bttg-tab-content="${$(this).data(
										"bttg-tab"
									)}"]`
								).removeClass("d-none")
							}
						)

						// Settings menu.
						const bttgSettingsMenu = $(`<div>`, {
							class: "list-group",
						}).appendTo(bttgSettingsWindow)

						// Settings button.
						const bttgBtnSettingsGeneral = $(`<a>`, {
							href: "#",
							class: `list-group-item list-group-item-action p-2 ${
								mySettings.helped ? "active" : ""
							}`,
							"data-bttg-tab": "settings-general",
							text: "Geral",
						}).appendTo(bttgSettingsMenu)

						// Settings tab.
						const bttgBlockedUsersContainer = $(`<div>`, {
							text: "Você não possui usuários bloqueados.",
						})

						// List blocked users.
						const bttgBlockedUsers = bttgUsersBlockedGet()
						if (bttgBlockedUsers.length) {
							bttgBlockedUsersContainer.empty().append(
								$(`<h6>`, {
									text: "Usuários bloqueados",
									css: {
										"font-weight": "600",
										"font-size": "16px",
									},
								})
							)

							$.each(bttgBlockedUsers, (i, user) => {
								bttgBlockedUsersContainer.append(
									$(`<div>`, {
										class: "form-group form-check",
									})
										.append(
											$(`<input>`, {
												type: "checkbox",
												class: "form-check-input",
												id: `bttg-checkbox-${user}`,
												checked: true,
											}).on("change", function () {
												bttgUserUnblock(user)
											})
										)
										.append(
											$(`<label >`, {
												class: "form-check-label",
												for: `bttg-checkbox-${user}`,
												text: user,
											})
										)
								)
							})

							bttgBlockedUsersContainer
								.children()
								.last()
								.addClass("m-0")
						}

						const bttgTabSettingsGeneral = $(`<div>`, {
							class: "d-none",
							"data-bttg-tab-content": "settings-general",
						}).append(bttgBlockedUsersContainer)

						// Backup button.
						const bttgBtnSettingsBackup = $(`<a>`, {
							href: "#",
							class: `list-group-item list-group-item-action p-2 ${
								!mySettings.helped ? "active" : ""
							}`,
							"data-bttg-tab": "settings-backup",
							text: "Backup",
						}).appendTo(bttgSettingsMenu)

						// Backup tab.
						const bttgTabSettingsBackup = $(`<div>`, {
							class: "d-none",
							"data-bttg-tab-content": "settings-backup",
						})
							.append(
								$(`<button>`, {
									type: "button",
									class: "btn btn-primary btn-block mb-3",
									text: "Salvar configurações",
								}).on("click", function (e) {
									e.stopImmediatePropagation()
									e.preventDefault()
									bttgSettingsDownload()
								})
							)
							.append(
								$(`<button>`, {
									type: "button",
									class: "btn btn-outline-danger btn-sm btn-block m-0",
									text: "Carregar configurações",
								}).on("click", function (e) {
									e.stopImmediatePropagation()
									e.preventDefault()

									const btn = $(this)

									bttgSettingsUpload()
										.then((myNewSettings) => {
											btn.addClass("disabled")

											bttgSettingsUpdate({
												helped:
													myNewSettings.helped ??
													false,
												darkmode:
													myNewSettings.darkmode ??
													false,
												users:
													myNewSettings.users ?? [],
												autosave: true,
												_callback: () => {
													// Gives the browser time to do it's thing.
													// Trust me, this is needed.
													// You have no idea of how many bugs are shipped with browsers...
													setTimeout(() => {
														console.log("Bye!")
														window.location.reload()
													}, 1000)
												},
											})
										})
										.catch((err) => {
											btn.removeClass("disabled")
											alert(err)
										})
								})
							)

						// Help button.
						const bttgBtnSettingsHelp = $(`<a>`, {
							href: "#",
							class: `list-group-item list-group-item-action p-2 ${
								!mySettings.helped ? "active" : ""
							}`,
							"data-bttg-tab": "settings-help",
							text: "Ajuda",
						}).appendTo(bttgSettingsMenu)

						// Help tab.
						const bttgTabSettingsHelp = $(`<div>`, {
							class: "d-none",
							"data-bttg-tab-content": "settings-help",
						})
							.append(
								$(`<p>`, {
									html: `- Clique em (<i class="fab fa-simplybuilt"></i>) para abrir este menu.`,
								})
							)
							.append(
								$(`<p>`, {
									text: `- Posicione o mouse sobre um comentário, para exibir os botões "Reportar" e "Bloquear".`,
								})
							)
							.append(
								$(`<p>`, {
									text: `- As configurações serão salvas no seu navegador (e somente ele).`,
								})
							)
							.append(
								$(`<p>`, {
									text: `- Se você gostou da iniciativa, agradeça não sendo um completo imbecil.`,
								})
							)
							.append(
								$(`<p>`, {
									html: `- Sugestões? <a href="https://gatry.com/usuarios/detalhe/desireeoficial">Meu perfil</a>.`,
									class: "m-0",
								})
							)

						bttgSettingsWindow.append(
							$(`<div>`, { class: "row no-gutters" })
								.append(
									$(`<div>`, {
										class: "col-12 col-md-4 pr-md-2 mt-2",
									}).append(bttgSettingsMenu)
								)
								.append(
									$(`<div>`, {
										class: "col-12 col-md-8 mt-2",
									}).append(
										$(`<div>`, {
											class: "border rounded p-2",
											css: {
												"font-size": "14px",
												"text-align": " left",
											},
										})
											.append(bttgTabSettingsGeneral)
											.append(bttgTabSettingsBackup)
											.append(bttgTabSettingsHelp)
									)
								)
						)

						// Save helped settings
						if (!bttgSettingsGet().helped) {
							bttgBtnSettingsHelp.trigger("click")

							bttgSettingsUpdate({
								helped: true,
								autosave: true,
							})
						} else {
							bttgBtnSettingsGeneral.trigger("click")
						}

						clearInterval(timer)
					}
				}, 100)

				Swal.fire({
					title: `Better Gatry ${BTTG_VERSION}`,
					html: `<div data-bttg-settings-window-container="true"></div>`,
					type: null,
				})
			})
			.appendTo(bttgArea)
			.append($(`<i>`, { class: "fab fa-simplybuilt" }))

		// If user never saw the help screen, show it.
		// Make them see it.
		// Make them consume it.
		// Make them live it.
		if (!bttgSettingsGet().helped) {
			bttgBtnSettings.trigger("click")
		}

		// Dark mode selector
		const btnDarkMode = $(`<a>`, {
			href: "#",
			class: "bttg-btn-dark-mode",
			css: {
				"align-items": "center",
				"border-radius": "100%",
				color: "white",
				display: "flex",
				"font-size": "10px",
				height: "20px",
				"justify-content": "center",
				opacity: ".9",
				width: "20px",
			},
		})
			.on("click", function (e) {
				e.stopImmediatePropagation()
				e.preventDefault()
				$("html").toggleClass("bttg-dark-mode")
				bttgSettingsUpdate({
					darkmode: !bttgSettingsGet().darkmode,
					autosave: true,
				})
			})
			.append($(`<i>`, { class: "fa fa-star bttg-is-sun" }))
			.append($(`<i>`, { class: "fa fa-moon bttg-is-moon" }))
			.appendTo(bttgArea)

		// Filter users
		bttgUsersFilter()

		// Replaces the default comments lightbox call to action.
		$(document).off("click", "[data-lightbox-comments]")
		$(document).on("click", "[data-lightbox-comments]", function (e) {
			e.stopImmediatePropagation()
			e.preventDefault()

			var url = $(this).prop("href")

			var popup = new Fancybox(
				[
					{
						type: "ajax",
						src: url,
					},
				],
				{
					mainClass: "fancybox-gatry fancybox-gatry-comment",
					on: {
						loaded: bttgUsersFilter,
						ready: bttgUsersFilter,
						done: bttgUsersFilter,
					},
				}
			)
		})

		// Replaces the default "load more" call to action.
		var loading = false
		var userClickLoadMore = false
		$(".load-more button").off("click")
		$(document).on("click", ".load-more button", function (e) {
			e.stopImmediatePropagation()
			e.preventDefault()

			userClickLoadMore = true

			if (loading) return

			loading = true

			var $this = $(this)
			var url = $(this).data("url")
			var appendLocal = $(this).data("appendLocal")
			var finishText =
				$(this).data("finishText") ||
				"Todos os registros foram exibidos"
			var exclude = $(this).data("exclude") || null
			var page = parseInt($(this).data("currentPage"))
			var nextPage = page + 1
			var scrollTop = document.documentElement.scrollTop

			$this.html("Carregando, aguarde...")

			$.get(url, { page: nextPage, exclude: exclude }, function (e) {
				if (e.length == 0) {
					$this.prop("disabled", true)
					userClickLoadMore = false
					$this.html(finishText)
					return
				}

				// Hack to fix duplicated posts.
				$(e).each(function () {
					const article = $(this)

					if ($(this).find(".description h3").length) {
						const title = $(this).find(".description h3").text()

						if (!$(`article:contains("${title}")`).length) {
							$(appendLocal).append(article)
						}
					} else if ($(this).find(".comment-content").length) {
						const comment = $(this).find(".comment-content").text()

						if (!$(`.comment:contains("${comment}")`).length) {
							$(appendLocal).append(article)
						}
					}
				})

				$this.data("currentPage", nextPage)

				window.scrollTo(0, scrollTop)
				loading = false

				$this.html("Carregar mais...")

				bttgUsersFilter()
			})
		})

		// Replaces the default window scroll call to action.
		$(window).on("scroll", function (e) {
			if (!userClickLoadMore && !$.browser.mobile) return
			if ($(".load-more button").length == 0) return

			if (
				$(window).scrollTop() >=
				$(document).height() - $(window).height() - 10
			) {
				$(".load-more button").click()
			}
		})
	})
}
