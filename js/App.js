//Object Class
idLine = 0;
const productLine = [];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

function deletProduct(element) {
    // console.log(element);
    // console.log(productLine);
    if (element >= 0) {
        const ui = new Ui();
        //Delete from HTML
        // console.log(document.querySelector('#row-' + element).parentElement);
        document.querySelector('#row-' + element).parentElement.remove();
        ui.showMenssage('Product ' + productLine[element].name + ' has Deleted', 'danger');
        // console.log(productLine[element].total);
        // console.log(ui.summary());
        // console.log();
        let summarySubT = ui.summary() - productLine[element].total;
        subTotalSummary.innerHTML = new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD' }
        ).format(summarySubT);
        //Delete from Arry productLine
        // console.log(delete productLine[element]);
        delete productLine[element];
        
       
    }
}

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
        // console.log(product);
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

    summary() {
        let totals =[]; 
        for (let items of productLine) {
              totals.push(items.total);
        }
        return totals.reduce(reducer);
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
    .addEventListener('submit', function(e) {
        const id = idLine;
        const name = document.getElementById('name').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const discount = parseFloat(document.getElementById('discount').value);
        const price = parseFloat(document.getElementById('price').value);
        const total = ((price * quantity) * (1 - (discount/100)));
        const subTotalSummary = document.getElementById('subTotalSummary');
        const product = new Product(id, name, quantity, discount, price, total);
        const ui = new Ui();

        if (name === '' ||  quantity === '' || discount === '' || price === '') {
            ui.showMenssage('Complete Fields Please', 'warning');
        } else{
            ui.addProduct(product);

            // console.log(ui.summary());
            subTotalSummary.innerHTML = new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD' }
            ).format(ui.summary());
        }
        e.preventDefault();
    });