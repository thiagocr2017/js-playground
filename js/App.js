// Documentation:
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/isNaN
// https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
// https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault



// Global vairiables and const.
let idLine = 0;
const productLine = [];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// Functions
// 
// 
//Function Invoice Summary Subtotal, print the Subtotal HTML.
function subTotalCalculation() {
    let stotal = 0.00;
    // Validation and Calculation
    productLine.forEach(element => {
    if (isNaN(element.total)) {
        stotal += 0
    } else{
        stotal += element.total
    }});

    return stotal;
}

function deletProduct(element) {
    if (element >= 0) {
        const ui = new Ui();
        let subtotalHTML = 0.00;
        //Delete from HTML
        
        document.querySelector('#row-' + element).parentElement.remove();
        ui.showMenssage('Product ' + productLine[element].name + ' has Deleted', 'danger');

        // Do the Math.
        if ( isNaN(productLine[element].total)) {
            subtotalHTML = subTotalCalculation() - 0
        } else {
            subtotalHTML = subTotalCalculation() - productLine[element].total
        }
        // end Do the Math.

        subTotalSummary.innerHTML = new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD' }
        ).format(subtotalHTML);
        
        //Delete from Arry productLine
        delete productLine[element];
    }
}

// Objects
// 
// 
// Product Object
class Product {
    constructor(id, name, quantity, discount, price, total) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.discount = discount;
        this.price = price;
        this.total = total;
    }
}

class Ui {
    // corregir quando los product values NaN = 0;
    addProduct(product) {
        console.log(product);
        productLine.push(product);
        const productList = document.getElementById('productList');
        const tbody = document.createElement('div');
        tbody.innerHTML = `
            <div id="row-${productLine.indexOf(product)}" class="row text-center" style="border: 1px solid lightgray;">
                <div class="col">
                <button onclick="deletProduct(${productLine.indexOf(product)})" href="#" name="delet" class="btn btn-link"> Delet </button>
                </div>
                <div class="col mt-2"> 
                 ${product.name}
                </div>
                <div class="col mt-2">
                 ${product.quantity}
                </div>
                <div class="col mt-2">
                 ${parseFloat(product.discount).toFixed(2)+"%"}
                </div>
                <div class="col mt-2">
                 ${ new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD' }
                    ).format(product.price)}
                </div>
                <div class="col mt-2 totalprice">
                 ${ new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD' }
                    ).format(product.total)}
                </div>
            </div>    
        `;
        productList.appendChild(tbody);
        
        this.showMenssage('Product Added Successfuly', 'success');
        this.resetForm();
        idLine++;
    }

    resetForm() {
        document.getElementById('productForm').reset();
    }

    showMenssage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Showing in the DOM
        const app = document.querySelector('#message');
        app.append(div);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

// DOM Event
document.getElementById('productForm')
    .addEventListener('submit', function(evt) {

        // Product Info
        const id = idLine;
        const name = document.getElementById('name').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const discount = parseFloat(document.getElementById('discount').value);
        const price = parseFloat(document.getElementById('price').value);
        const total = ((price * quantity) * (1 - (discount/100)));
        const subTotalSummary = document.getElementById('subTotalSummary');

        // Call Class Produc and Ui
        const product = new Product(id, name, quantity, discount, price, total);
        const ui = new Ui();

        if (name === '' ||  quantity === '' || discount === '' || price === '') {
            ui.showMenssage('Complete Fields Please', 'warning');
        } else{
            ui.addProduct(product);
            subTotalSummary.innerHTML = new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD' }
            ).format(subTotalCalculation());
        }

        evt.preventDefault();
    });