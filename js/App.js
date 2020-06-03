// Documentation:
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/isNaN
// https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector
// https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault
// https://developer.mozilla.org/es/docs/Web/Events/DOMContentLoaded

// Global vairiables and const.
// 
let idLine = 0;
const iva = 0.13;
const productLine = [];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// Invoice Summary Data:Var
let sSubtotal = 0.00;
let sDiscount = 0.00;
let sIVA = 0.00;
let sTotal = 0.00;

// Functions
// 
// 
//Function Invoice Product Delete in productLine:Array and HTML.
function deletProduct(id) {
    if (id >= 0) {
        bootbox.confirm({
            message: `<h4 class="modal-title">Do you want to delet <strong>${productLine[id].name}</strong>?</h4>`, 
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-secondary'
            }
        },
            callback: function(result){ 
                    // Show Menssage deleted product.
                if(result == true){
                    document.querySelector('#row-' + id).parentElement.remove();
                    // Do the Math.
                    if (isNaN(productLine[id].total)) {
                        sIVA -= 0;
                        sSubtotal -= 0;
                        sDiscount -= 0;
                        sTotal -= 0;
                    } else {
                        // Round Summary
                        sSubtotal = parseFloat((sSubtotal).toFixed(2));
                        sDiscount = parseFloat((sDiscount).toFixed(2));
                        sIVA = parseFloat((sIVA).toFixed(2));
                        sTotal = parseFloat((sTotal).toFixed(2));
                    
                        sSubtotal -= parseFloat((productLine[id].total).toFixed(2));
                        sDiscount -= parseFloat(((productLine[id].quantity * productLine[id].price) - productLine[id].total).toFixed(2));
                        sIVA -= parseFloat((productLine[id].total * iva).toFixed(2));
                        sTotal -= parseFloat((productLine[id].total + (productLine[id].total * iva)).toFixed(2));

                    }
                    // TEST
                    // console.log("Deletando:");
                    // console.log(sSubtotal);
                    // console.log(sDiscount);
                    // console.log(sIVA);
                    // console.log(sTotal);
                
                    // Delete from productLine:Arry
                    delete productLine[id];
                
                    //Delete from HTML
                    subTotalSummary.innerHTML = new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD' }
                    ).format(sSubtotal);
                    document.getElementById('discountSummary').innerHTML = new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD' }
                    ).format(sDiscount);
                    document.getElementById('ivaSummary').innerHTML = new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD' }
                    ).format(sIVA);
                    document.getElementById('totalSummary').innerHTML = new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD' }
                    ).format(sTotal); 
                }
            }
        });
    }
    document.getElementById('name').focus();
}
//Function addSummary, print the Summary HTML.
function addSummary(id) {
    // Do the Math.
    if (isNaN(productLine[id].total)) {
        sSubtotal += 0;
        sDiscount += 0;
        sIVA += 0;
    } else {
        sSubtotal = parseFloat((sSubtotal).toFixed(2));
        sDiscount = parseFloat((sDiscount).toFixed(2));
        sIVA = parseFloat((sIVA).toFixed(2));
        sTotal = parseFloat((sTotal).toFixed(2));

        sSubtotal += parseFloat((productLine[id].total).toFixed(2));
        sDiscount += parseFloat(((productLine[id].quantity * productLine[id].price) - productLine[id].total).toFixed(2));
        sIVA += parseFloat((productLine[id].total * iva).toFixed(2));
        sTotal += parseFloat((productLine[id].total + (productLine[id].total * iva)).toFixed(2));
    }
    // console.log("Adding:");
    // console.log(sSubtotal);
    // console.log(sDiscount);
    // console.log(sIVA);
    // console.log(sTotal);

    //Add in HTML
    document.getElementById('subTotalSummary').innerHTML = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD' }
    ).format(sSubtotal);
    document.getElementById('discountSummary').innerHTML = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD' }
    ).format(sDiscount);
    document.getElementById('ivaSummary').innerHTML = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD' }
    ).format(sIVA);
    document.getElementById('totalSummary').innerHTML = new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD' }
    ).format(sTotal);
}

function save() {
    productLine.forEach(element => {
        console.log(element);
    });
    // bootbox.alert({
    //     message: '<h4 class="modal-title">Complete Fields Please!</h4>',
    //     backdrop: true,
    // });
    // const ui = new Ui();
    // ui.colorMenssage("success");
}

function cancel(){

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

    addProduct(product) {
        productLine.push(product);
        const productList = document.getElementById('productList');
        const tBody = document.createElement('div');
        tBody.innerHTML = `
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
        productList.appendChild(tBody);
        this.resetForm();
        idLine++;
        
    }

    resetForm() {
        document.getElementById('productForm').reset();
        document.getElementById('name').focus();
    }

    colorMenssage(cssClass) {
        const div = document.querySelector('.modal-content');
        div.className = `bg-${cssClass}`;
    }
}

// DOM Event
document.addEventListener("DOMContentLoaded", function(evt) {
    document.getElementById('name').focus();
})
document.getElementById('productForm')
    .addEventListener('submit', function(evt) {
        // Product User Inputs
        const id = idLine;
        const name = document.getElementById('name').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const discount = parseFloat(document.getElementById('discount').value);
        const price = parseFloat(document.getElementById('price').value);
        const total = ((price * quantity) * (1 - (discount/100)));
        const ui = new Ui();
        // Validations
        if (name === "" || quantity === "") {
            bootbox.alert({
                message: '<h4 class="modal-title">Complete Fields Please!</h4>',
                backdrop: true,
            });
            ui.colorMenssage("warning");
        } else if(isNaN(total)){
            bootbox.alert({
                message: '<h4 class="modal-title">Complete Fields Please!</h4>',
                backdrop: true,
            });
            ui.colorMenssage("warning");
        } else{
            const product = new Product(id, name, quantity, discount, price, total);
            ui.addProduct(product);
            addSummary(id);
        }
        evt.preventDefault();
    });