const API_URL_RANDOM =
	'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_OixKTUrsYplf60tg9pJBWxjq3Qm9TXfiubVVOOnkJHF8UkuxCWHQP20bFnLre537';
const API_URL_FAVORITES =
	'https://api.thecatapi.com/v1/favourites?api_key=live_OixKTUrsYplf60tg9pJBWxjq3Qm9TXfiubVVOOnkJHF8UkuxCWHQP20bFnLre537';
const API_URL_DELETE = (id) =>
	`https://api.thecatapi.com/v1/favourites/${id}?api_key=live_OixKTUrsYplf60tg9pJBWxjq3Qm9TXfiubVVOOnkJHF8UkuxCWHQP20bFnLre537`;

const spanError = document.getElementById('error');

async function loadRandomGatitos() {
	const res = await fetch(API_URL_RANDOM);
	const data = await res.json();
	console.log('Random');
	console.log(data);

	if (res.status !== 200) {
		spanError.innerHTML = 'Hubo un error: ' + res.status;
	} else {
		const img1 = document.getElementById('img1');
		const img2 = document.getElementById('img2');
		const btn1 = document.getElementById('btn1');
		const btn2 = document.getElementById('btn2');
		img1.src = data[0].url;
		img2.src = data[1].url;

		btn1.onclick = () => saveFavouriteGatito(data[0].id);
		btn2.onclick = () => saveFavouriteGatito(data[1].id);
	}
}

async function loadFavouriteGatitos() {
	const res = await fetch(API_URL_FAVORITES);
	const data = await res.json();
	console.log('Favoritos');
	console.log(data);

	if (res.status !== 200) {
		spanError.innerHTML = 'Hubo un error: ' + res.status + data.message;
	} else {
		const section = document.getElementById('favoriteGatitos');
		section.innerHTML = '';
		const h2 = document.createElement('h2');
		const h2Text = document.createTextNode('Gatitos favoritos');

		h2.appendChild(h2Text);
		section.appendChild(h2);
		data.forEach((gatito) => {
			const article = document.createElement('article');
			const img = document.createElement('img');
			const btn = document.createElement('button');
			const btnText = document.createTextNode('Sacar al Gatito de favoritos');

			img.src = gatito.image.url;
			img.width = 150;
			btn.appendChild(btnText);
			article.appendChild(img);
			article.appendChild(btn);
			section.appendChild(article);

			btn.onclick = () => deleteFavoriteGatito(gatito.id);
		});
	}
}

async function saveFavouriteGatito(id) {
	const res = await fetch(API_URL_FAVORITES, {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plane',
			'X-API-KEY':
				'live_OixKTUrsYplf60tg9pJBWxjq3Qm9TXfiubVVOOnkJHF8UkuxCWHQP20bFnLre537',
		},
		body: JSON.stringify({
			image_id: id,
		}),
	});
	const data = await res.json();

	console.log('Save');
	console.log(res);

	if (res.status !== 200) {
		spanError.innerHTML = 'Hubo un error: ' + res.status + data.message;
	} else {
		console.log('Michi agregado de favoritos');
		loadFavouriteGatitos();
	}
}

async function deleteFavoriteGatito(id) {
	const res = await fetch(API_URL_DELETE(id), {
		method: 'DELETE',
	});
	const data = await res.json();

	console.log('Delete');
	console.log(res);

	if (res.status !== 200) {
		spanError.innerHTML = 'Hubo un error: ' + res.status + data.message;
	} else {
		console.log('Michi eliminado de favoritos');
		loadFavouriteGatitos();
	}
}

loadRandomGatitos();
loadFavouriteGatitos();
