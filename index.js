// API : Gelen istekleri izler ve isteklere cevap gönderir.

// http modülünü çağırmamız gerek
const http = require('http');
const fs = require('fs')
const replaceTemp = require('./modules/replaceTemp.js')
const url = require('url')

/*
* createServer(), verdiğimiz dinleyici fonksiyonu api'a her istek geldiğinde tetikler
1) request > istek ile alakalı veriler
2) response > cevap göndermemizi sağlayacak nesne

* bu fonksiyon içeriisnde gelen isteğe göre cevap gönderilir.
*/


/*
*
* Routing
* API'a gelen isteğin hangi endpoint'e(uç noktaya/ yola) geldiğini tespit edip ona göre farklı cevaplar gönderme işlemine routing denir.
* Routing için client'ın hangi yola ve hangi http methodu ile istek attığını bilmemiz gerekiyor.
*/

// html şablon verinlerine erişme
let tempOverview = fs.readFileSync('templates/overview.html','utf-8')
let tempProduct = fs.readFileSync('templates/product.html','utf-8')
let tempCard = fs.readFileSync('templates/card.html','utf-8')

let jsonData = fs.readFileSync('dev-data/data.json','utf-8')

const data = JSON.parse(jsonData)

const server = http.createServer((request,response) => {
    console.log("API'ye istek geldi")

    // gelen isteğin detaylarını konsala yazdır
    // console.log(request.method, 'method tipinde')
    // console.log(request.url, 'adresine istek geldi')

    //gelen isteğin url'ine gçre farklı cevap gönder
    // if(request.url === '/overview'){
    //     response.end('<h1>Ana Sayfa</h1>')
    // }

    // if(request.url === '/product'){
    //     return response.end('<h1>Urunler</h1>')
    // }

    const {query,pathname} = url.parse(request.url,true)


    switch(pathname){
        case '/overview':
            const cards = data.map((el) => replaceTemp(tempCard,el))
    tempOverview = tempOverview.replace('{%PRODUCT_CARDS%}',cards)
            
            return response.end(tempOverview)

        case '/product':
            // 1) dizideki doğru elemanı bul
        const eleman = data.find((item) => item.id == query.id)
            // 2) detay sayfasının html'ini bulunan elemana göre güncelle
        const output = replaceTemp(tempProduct,eleman)
            // 3) güncel html'i client'a gönder
            return response.end(output)

        default:
            return response.end('<h1>Tanimlanmayan Yol</h1>')
    }

    // gelen isteğe gönderilecek cevap
    response.end("merhaba dünya !!!")
})

// bir dinleyici oluşturup hangi porta gelen isteklerin dinleneceğini söylemeliyiz.
server.listen(3535,"127.0.0.1",() => {
    console.log("IP adresinin 3535 portuna gelen istekler dinlemeye alındı")
})