// ==UserScript==
// @name        Better Gatry
// @description Make Gatry great.
// @match       *://gatry.com/*
// ==/UserScript==

const bttgDarkModeStyles = `<style id="bttg-dark-mode">
	:root{
		--bttg-color-bg: #222831;
		--bttg-color-fg: #393E46;
		--bttg-color-bc: #343a40;
		--bttg-color-fc: #cccccc;
		--fancybox-content-bg: var(--bttg-color-fg);
		--fancybox-content-color: var(--bttg-color-fc);
	}
	.bttg-btn-dark-mode{
		background: #f27474;
	}
	.bttg-dark-mode .bttg-btn-dark-mode{
		background: #495057;
	}
	.bttg-dark-mode .bttg-btn-dark-mode .fa-sun,
	.bttg-btn-dark-mode .fa-moon{
		display: none;
	}
	.bttg-btn-dark-mode .fa-sun,
	.bttg-dark-mode .bttg-btn-dark-mode .fa-moon{
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
	</style>`

document.head.innerHTML += bttgDarkModeStyles
const bttgDarkmodeOn = () => {
	document.getElementsByTagName("html")[0].classList.add("bttg-dark-mode")
}

const bttgDarkmodeOff = () => {
	document.getElementsByTagName("html")[0].classList.remove("bttg-dark-mode")
}

const bttgGetSettings = () => {
	const defaults = {
		helped: false,
		darkmode: true,
		users: [],
	}

	try {
		const mySettings = JSON.parse(
			localStorage.getItem("bttg_mysettings") ?? JSON.stringify({})
		)

		return { ...{}, ...defaults, ...mySettings }
	} catch (err) {
		console.error(err)
		return defaults
	}
}

const bttgSetSettings = (
	{ helped = null, darkmode = null, users = null } = {
		helped: null,
		darkmode: null,
		users: null,
	}
) => {
	const mySettings = bttgGetSettings()
	mySettings.helped = helped !== null ? helped : mySettings.helped
	mySettings.darkmode = darkmode !== null ? darkmode : mySettings.darkmode
	mySettings.users = users !== null ? users : mySettings.users
	localStorage.setItem("bttg_mysettings", JSON.stringify(mySettings))
}

const bttgGetBlocked = () => {
	return bttgGetSettings().users
}

const bttgDoBlock = (user = "") => {
	const myBlocked = bttgGetBlocked()
	myBlocked.push(user)
	bttgSetSettings({ users: [...new Set(myBlocked)] })
	bttgCleanThem()
}

const bttgDoUnblock = (user = "") => {
	var myBlocked = bttgGetBlocked()
	myBlocked = myBlocked.filter(function (u) {
		return u !== user
	})
	bttgSetSettings({ users: [...new Set(myBlocked)] })
	window.location.reload()
}

const bttgCleanThem = () => {
	const myBlocked = bttgGetBlocked()

	$(`.comment-wrapper`).each(function () {
		const comment = $(this)
		const commentHeader = comment.find(`.comment-header`).first()
		const profileLink = commentHeader.find(`a`).attr(`href`).toString()
		const profileAt = profileLink.toLowerCase().split("/").slice(-1)[0]
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

		if (comment.find(`[data-bttg-user-block]`).length) return null

		const blockUserButton = $(`<a>`, {
			href: "#",
			"data-bttg-user-block": profileAt,
			css: {
				color: "coral",
				float: "right",
				"margin-left": "7px",
			},
			html: `<i class="fa fa-ban"></i>`,
		}).hide()

		const commentReportArea = comment.find(`.comment-report`)
		blockUserButton.insertBefore(commentReportArea)
	})
}

{
	const mySettings = bttgGetSettings()

	if (mySettings.darkmode) {
		bttgDarkmodeOn()
	}
}

window.addEventListener("load", () => {
	const mySettings = bttgGetSettings()

	const bttgArea = $(`<div>`, {
		css: {
			"align-items": "center",
			display: "flex",
			"flex-direction": "column",
			gap: "5px",
			"justify-content": "center",
		},
	}).appendTo($(`section.top-bar .header .container .wrapper-header`))

	const btnHelp = $(`<a>`, {
		href: "#",
		css: {
			"align-items": "center",
			background: "#ff338b",
			"border-radius": "100%",
			color: "white",
			display: "flex",
			"font-size": "10px",
			height: "20px",
			"justify-content": "center",
			opacity: ".9",
			width: "20px",
		},
	}).append($(`<i>`, { class: "fa fa-question" }))

	btnHelp.on("click", function (e) {
		e.stopImmediatePropagation()
		e.preventDefault()

		Swal.fire({
			title: "Better Gatry 0.0.1",
			text: "Teste",
			html: `
			<ul style="font-size:16px;text-align:left;list-style:disc;padding-left:15px;">
				<li style="margin-bottom:5px">Passe o mouse em um comentário, para exibir o botão de bloquear.</li>
				<li style="margin-bottom:5px">Clique na (<i class="fa fa-question"></i>) no seu avatar para abrir essa janela.</li>
			</ul>
			<div style="margin:5px 0 10px 0;padding:20px;background:rgba(0 123 255 / .25);border-radius:10px;">
				<label>Bloqueados</label>
				<ul style="margin:0">
					${
						bttgGetBlocked().length
							? bttgGetBlocked()
									.map((user, i) => {
										return `<li style="font-size:18px" data-bttg-user-unblock="${user}">${user}<a href="#" style="margin-left:5px;color:green"><i class="fa fa-check"></i></a></li>`
									})
									.join("")
							: `<li style="font-size:14px" bttg-users-blocked-none="true">Nenhum!</li>`
					}
				</ul>
			</div>
			<p><small>Por <strong>*a*</strong> <a href="https://gatry.com/usuarios/detalhe/desireeoficial">Desiree</a></small></p>`,
			type: "info",
		})

		bttgSetSettings({ helped: true })
	})

	bttgArea.append(btnHelp)

	if (!mySettings.helped) {
		btnHelp.trigger("click")
	}

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
		.append($(`<i>`, { class: "fa fa-sun" }))
		.append($(`<i>`, { class: "fa fa-moon" }))

	btnDarkMode.on("click", function (e) {
		e.stopImmediatePropagation()
		e.preventDefault()
		$("html").toggleClass("bttg-dark-mode")
		bttgSetSettings({ darkmode: !mySettings.darkmode })
	})

	bttgArea.append(btnDarkMode)

	bttgCleanThem()

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
					loaded: bttgCleanThem,
					ready: bttgCleanThem,
					done: bttgCleanThem,
				},
			}
		)
	})

	$(".load-more button").off("click")

	var loading = false
	var userClickLoadMore = false
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
			$(this).data("finishText") || "Todos os registros foram exibidos"
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

			$(appendLocal).append(e)

			$this.data("currentPage", nextPage)

			window.scrollTo(0, scrollTop)
			loading = false

			$this.html("Carregar mais...")

			bttgCleanThem()
		})
	})

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

	$(document).on("click", `[data-bttg-user-block]`, function (e) {
		e.stopImmediatePropagation()
		e.preventDefault()
		const userID = $(this).data(`bttg-user-block`)
		if ("desireeoficial" == userID) {
			alert("Eu crio o script e você tenta usar contra mim?")
			alert("Imbecil.")
			return null
		}
		bttgDoBlock(userID)
		$(`[bttg-users-blocked-none]`).remove()
	})

	$(document).on("click", `[data-bttg-user-unblock]`, function (e) {
		e.stopImmediatePropagation()
		e.preventDefault()
		const userID = $(this).data(`bttg-user-unblock`)
		bttgDoUnblock(userID)
		$(`[data-bttg-user-unblock="${userID}"]`).remove()
	})

	$("body").append(`<style>
	.comments .comment .comment-wrapper:hover .comment-header [data-bttg-user-block] {display: block !important;}
	</style>`)
})
