const API_URL = `https://api.thecatapi.com/v1/images/search?limit=10&api_key= ${
	import.meta.env.API_KEY
}`;
// ${}
// fetch(URL)
// 		.then((res) => res.json())
// 		.then((data) => {
// 			const img = document.querySelector('img');
// 			img.src = data[0].url;
// 			console.log(data);
// 		});

async function reload() {
	const res = await fetch(API_URL);
	const data = await res.json();
	console.log('🚀  data:', data);

	const img1 = document.getElementById('img1');
	const img2 = document.getElementById('img2');
	const img3 = document.getElementById('img3');
	const img4 = document.getElementById('img4');
	const img5 = document.getElementById('img5');
	const img6 = document.getElementById('img6');
	const img7 = document.getElementById('img7');
	const img8 = document.getElementById('img8');
	const img9 = document.getElementById('img9');
	const img10 = document.getElementById('img10');

	img1.src = data[0].url;
	img2.src = data[1].url;
	img3.src = data[2].url;
	img4.src = data[3].url;
	img5.src = data[4].url;
	img6.src = data[5].url;
	img7.src = data[6].url;
	img8.src = data[7].url;
	img9.src = data[8].url;
	img10.src = data[9].url;
}

reload();
