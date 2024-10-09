// card html'ini ve ürün bilgilerini parametre olarak alıcak
// card html'inin içerisinde değişken olarak tanımlanan değerlerin yerine ürün bilgilerini ekleyecek bir fonksiiyon yazalım.

const replaceTemp = (html,data) => {
    let output = html.replace(/{%PRODUCTNAME%}/g,data.productName)

    output = output.replace(/{%PRICE%}/g,data.price)
    output = output.replace(/{%QUANTITY%}/g,data.quantity)
    output = output.replace(/%IMAGE%/g,data.image)
    output = output.replace(/{%ID%}/g,data.id)
    output = output.replace(/{%FROM%}/g,data.from)
    output = output.replace(/{%DESCRIPTION%}/g,data.description)
    output = output.replace(/{%NUTRIENTS%}/g,data.nutrients)

    if(data.organic ===false){
        output = output.replace('{%NOT_ORGANIC%}','not-organic')
    }
    return output
}

// javascript fonksiyonunu export etme
module.exports = replaceTemp