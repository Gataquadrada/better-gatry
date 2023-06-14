// ==UserScript==
// @name        Better Gatry
// @description Make Gatry great.
// @match       *://gatry.com/*
// ==/UserScript==

{
	// Version, duh.
	const BTTG_VERSION = "0.0.5"

	// Don't touch this.
	const BTTG_DATA = {
		who_am_i: null,
		can_fetch: false,
	}

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
	const BTTG_VERIFIED = {
		gatry: {
			badge: "admin",
			emoji: "🉐",
		},
	}

	try {
		fetch(
			"https://website-thumbnail-gataquadrada.vercel.app/public/verified-users.json"
		).then((response) => {
			BTTG_DATA.can_fetch = true
			response.json().then((jsonData) => {
				jsonData.users.forEach((u) => {
					if ("gatry" !== u.user) {
						BTTG_VERIFIED[u.user] = {
							badge: u.badge ?? null,
							emoji: u.emoji ?? null,
							avatar: u.avatar ?? null,
						}
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
		rich_links: false,
		shadow_block: false,
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
			color: var(--bttg-color-fc);
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
		bttgMySettings.rich_links = mySettings.rich_links
		bttgMySettings.shadow_block = mySettings.shadow_block
		bttgMySettings.users = mySettings.users
	} catch (err) {
		console.error(err)
	}

	// *Utils (set as const so it's impossible to rewrite).
	// Always use getters and setters, kids.
	const bttgSettingsGet = () => {
		return bttgMySettings
	}

	// Settings handler.
	const bttgSettingsUpdate = (
		{
			helped = null,
			darkmode = null,
			rich_links = null,
			shadow_block = null,
			users = null,
			_callback = () => {},
			_autosave = false,
		} = {
			helped: null,
			darkmode: null,
			rich_links: null,
			shadow_block: null,
			users: null,
			_callback: () => {},
			_autosave: false,
		}
	) => {
		bttgMySettings.helped = helped !== null ? helped : bttgMySettings.helped
		bttgMySettings.darkmode =
			darkmode !== null ? darkmode : bttgMySettings.darkmode
		bttgMySettings.rich_links =
			rich_links !== null ? rich_links : bttgMySettings.rich_links
		bttgMySettings.shadow_block =
			shadow_block !== null ? shadow_block : bttgMySettings.shadow_block
		bttgMySettings.users = users !== null ? users : bttgMySettings.users

		if (_autosave) {
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
		_callback()
	}

	// Return blocked users.
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
			_autosave: true,
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
			_autosave: true,
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

	// Darkmode on.
	const bttgDarkmodeOn = () => {
		// It's vanilla so Javascript will process it instantly.
		document.getElementsByTagName("html")[0].classList.add("bttg-dark-mode")
	}

	// Darkmode off.
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
		const d = new Date()
		const m = d.getMonth()

		$(`.comment-wrapper:not([data-bttg-done-processing])`).each(
			function () {
				const comment = $(this).attr("data-bttg-done-processing", true)
				const commentHeader = comment.find(".comment-header").first()
				const commentText = comment.find(".comment-content").first()
				const profileLink = commentHeader
					.find("a")
					.attr("href")
					.toString()
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
					if (bttgMySettings.shadow_block) {
						const content = commentText.html()

						commentText
							.text("Comentário bloqueado (clique para exibir).")
							.css({
								cursor: "pointer",
								"font-style": "italic",
							})
							.one("click", function () {
								commentText
									.css({
										cursor: "unset",
										"font-style": "unset",
									})
									.html(content)
							})
					} else {
						commentHeader
							.find("a")
							.first()
							.text("Usuário")
							.find("img.rounded-circle")
							.first()
							.attr("src", "/img/user_default.png")

						comment
							.find(".comment-footer")
							.first()
							.find(".like, .answer")
							.remove()

						commentText.text("Comentário bloqueado.")
					}
					return null
				}

				// Rich links.
				if (BTTG_DATA.can_fetch && bttgMySettings.rich_links) {
					$(`.comment-content:not([data-bttg-rich-loaded])`).each(
						function () {
							const comment = $(this).attr(
								"data-bttg-rich-loaded",
								true
							)

							comment.find("a").each(function () {
								const a = $(this)
								const url = a.attr("href")
								const ext = url.split(".").slice(-1)

								const preview = $(`<a>`, {
									href: url,
									target: "_blank",
									class: "media p-2 rounded bg-secondary text-light",
								})

								const title = $(`<h6>`, {
									class: "mt-0 mb-1",
									text: "Loading...",
									css: {
										overflow: "hidden",
										"text-overflow": "ellipsis",
										"white-space": "nowrap",
									},
								})

								const text = $(`<div>`, {
									text: "Loading preview...",
									css: {
										overflow: "hidden",
										"text-overflow": "ellipsis",
										"white-space": "nowrap",
									},
								})

								const img = $(`<img>`, {
									src: "https://placekitten.com/36/36",
									css: {
										height: "36px",
										inset: "0px",
										margin: "auto",
										"max-width": "100px",
										position: "abbsolute",
									},
								})

								preview
									.append(
										$(`<div>`, {
											class: "mr-2",
											css: {
												height: "36px",
												overflow: "hidden",
												position: "relative",
												width: "36px",
											},
										}).append(img)
									)
									.append(
										$(`<div>`, { class: "media-body w-50" })
											.append(title)
											.append(text)
									)
									.insertAfter(a)

								if (
									["gif", "jpg", "jpeg", "png"].includes(ext)
								) {
									img.attr("src", url)
									title.remove()
									text.text(url)
								} else {
									fetch(
										`https://website-thumbnail-gataquadrada.vercel.app/api/?url=${encodeURIComponent(
											url
										)}`,
										{ method: "POST" }
									)
										.then((response) => {
											response
												.json()
												.then((data) => {
													if (data?.url) {
														if (data?.image) {
															img.attr(
																"src",
																data.image
															)
														}

														if (data?.title) {
															title.text(
																data.title
															)
														}

														if (data?.description) {
															text.text(
																data.description
															)
														}
													} else {
														preview.remove()
													}
												})
												.catch((err) => {
													preview.remove()
												})
										})
										.catch((err) => {
											preview.remove()
										})
								}
							})
						}
					)
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
						setTimeout(() => {
							alert("Imbecil.")
						}, 3000)
						return null
					}

					bttgUserBlock(profileAt)
				})

				const commentReportArea = comment.find(`.comment-report`)
				blockUserButton.insertBefore(commentReportArea)

				// Custom assets.
				if (BTTG_VERIFIED[profileAt]) {
					// Verified badge.
					if (3 == m && BTTG_VERIFIED[profileAt].emoji) {
						const badge = $(`<span>`, {
							text: BTTG_VERIFIED[profileAt].emoji,
						}).insertBefore(
							commentHeader.find(".text-gray").first()
						)
					} else if (BTTG_VERIFIED[profileAt].badge) {
						const badge = $(`<img>`, {
							src: `https://website-thumbnail-gataquadrada.vercel.app/public/badge_${BTTG_VERIFIED[profileAt].badge}.png`,
							css: {
								height: "15px",
								width: "15px",
							},
						}).insertBefore(
							commentHeader.find(".text-gray").first()
						)
					}
				}
			}
		)
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

	// Current user's name.
	const bttgWhoAmI = () => {
		return (BTTG_DATA.who_am_i =
			$(`.header .login [data-user-menu="perfil"]`)
				.toArray()
				.reduce(function (filtered, current) {
					const a = $(current).find("a").first()

					if (!a.length) return filtered

					const href = a
						.attr("href")
						.toLowerCase()
						.split("/")
						.filter(function (v) {
							return v.trim()
						})

					if (3 == href.length && "detalhe" == href[1]) {
						filtered.push(href[2])
					}

					return filtered
				}, [])[0] ?? null)
	}

	// Custom Interface.
	const bttgInterfaceInit = () => {
		// Fix for search button.
		$(`form .search-bar [type="submit"]`).append(" Buscar")

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
				"background-image":
					"url('https://website-thumbnail-gataquadrada.vercel.app/public/badge_settings.png')",
				"background-repeat": "no-repeat",
				"background-position": "center center",
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
						// Actual settings.
						const bttgSettingsContainer = $(`<div>`, {
							class: "mb-5",
						})
							.append(
								$(`<h6>`, {
									text: "Preferências",
									css: {
										"font-weight": "600",
										"font-size": "16px",
									},
								})
							)
							.append(
								// Link preview.
								$(`<div>`, {
									class: "custom-control custom-switch mb-4",
								})
									.append(
										$(`<input>`, {
											type: "checkbox",
											class: "custom-control-input",
											id: "bttg-checkbox-settings-rich-links",
											checked: bttgMySettings.rich_links,
										}).on("change", function () {
											const checked =
												$(this).is(":checked")

											bttgSettingsUpdate({
												rich_links: checked,
												_autosave: true,
											})
										})
									)
									.append(
										$(`<label>`, {
											class: "custom-control-label",
											for: "bttg-checkbox-settings-rich-links",
											text: "Pré-visualizar links em comentários.",
										}).append(
											$(`<div>`, {
												class: "form-text text-muted",
												text: "(Depende de ferramenta de terceiros)",
											})
										)
									)
							)
							.append(
								// Shadow block.
								$(`<div>`, {
									class: "custom-control custom-switch",
								})
									.append(
										$(`<input>`, {
											type: "checkbox",
											class: "custom-control-input",
											id: "bttg-checkbox-settings-shadow-block",
											checked:
												bttgMySettings.shadow_block,
										}).on("change", function () {
											const checked =
												$(this).is(":checked")

											bttgSettingsUpdate({
												shadow_block: checked,
												_autosave: true,
											})
										})
									)
									.append(
										$(`<label>`, {
											class: "custom-control-label",
											for: "bttg-checkbox-settings-shadow-block",
											text: "Manter bloqueados, mas ocultar o conteúdo (clique para exibir).",
										})
									)
							)

						// Allow expand blocked comments.
						$(`<div>`, {
							class: "custom-control custom-switch",
						})
							.append(
								$(`<input>`, {
									type: "checkbox",
									class: "custom-control-input",
									id: "bttg-checkbox-settings-semi-block",
									checked: bttgMySettings.shadow_block,
								}).on("change", function () {
									const checked = $(this).is(":checked")

									bttgSettingsUpdate({
										shadow_block: checked,
										_autosave: true,
									})
								})
							)
							.append(
								$(`<label>`, {
									class: "custom-control-label",
									for: "bttg-checkbox-settings-semi-block",
									text: "Permitir clicar para ver comentários bloqueados.",
								})
							)

						// List blocked users.
						const bttgBlockedUsersContainer = $(`<div>`).append(
							$(`<h6>`, {
								text: "Usuários bloqueados",
								css: {
									"font-weight": "600",
									"font-size": "16px",
								},
							})
						)

						const bttgBlockedUsersList = $(`<div>`, {
							text: "Você não possui usuários bloqueados.",
						}).appendTo(bttgBlockedUsersContainer)

						const bttgBlockedUsers = bttgUsersBlockedGet()
						if (bttgBlockedUsers.length) {
							bttgBlockedUsersList.empty()

							$.each(bttgBlockedUsers, (i, user) => {
								bttgBlockedUsersList.append(
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

							bttgBlockedUsersList
								.children()
								.last()
								.addClass("m-0")
						}

						const bttgTabSettingsGeneral = $(`<div>`, {
							class: "d-none",
							"data-bttg-tab-content": "settings-general",
						})
							.append(bttgSettingsContainer)
							.append(bttgBlockedUsersContainer)

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
												rich_links:
													myNewSettings.rich_links ??
													false,
												shadow_block:
													myNewSettings.shadow_block ??
													false,
												users:
													myNewSettings.users ?? [],
												_autosave: true,
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
									html: `- Clique em <img src="https://website-thumbnail-gataquadrada.vercel.app/public/badge_settings.png"> para abrir este menu.`,
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
								_autosave: true,
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
					_autosave: true,
				})
			})
			.append($(`<i>`, { class: "fa fa-star bttg-is-sun" }))
			.append($(`<i>`, { class: "fa fa-moon bttg-is-moon" }))
			.appendTo(bttgArea)
	}

	// *After we declared everything, we start using.
	if (bttgMySettings.darkmode) {
		bttgDarkmodeOn()
	}

	// Once the page is ready (and Mr.G's code ran), do our thing.
	window.addEventListener("load", () => {
		// Gets user @ for future use.
		bttgWhoAmI()

		// Init interface.
		bttgInterfaceInit()

		// Filter users.
		bttgUsersFilter()

		// Profile picture preview.
		if ($(`form[action="/usuarios/minha-conta"]`).length) {
			const form = $(`form[action="/usuarios/minha-conta"]`)

			const fieldWrapper = form.find(`.form-group.file`)

			const previewWrapper = $(`<div>`, {
				class: "d-flex align-items-center",
			}).appendTo(fieldWrapper)

			const avatarTop = $(`.header .login .link-icon.rounded-circle`)
			const avatarPreview = avatarTop
				.clone()
				.addClass("mr-2")
				.height("40px")
				.width("40px")
				.appendTo(previewWrapper)

			const fileInput = fieldWrapper
				.find(`[name="photo"]`)
				.appendTo(previewWrapper)

			fileInput.on("change", function () {
				const input = $(this)
				const reader = new FileReader()
				reader.readAsDataURL(input[0].files[0])
				reader.onload = () => {
					avatarPreview.attr("src", reader.result)
				}
			})
		}

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
						const title = $(this)
							.find(".description h3")
							.text()
							.trim()
							.split("\n")

						if (!$(`article:contains("${title[0]}")`).length) {
							$(appendLocal).append(article)
						}
					} else if ($(this).find(".comment-content").length) {
						const comment = $(this)
							.find(".comment-content")
							.text()
							.trim()
							.split("\n")

						if (!$(`.comment:contains("${comment[0]}")`).length) {
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
