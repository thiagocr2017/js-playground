//Object Class
class Product {
    constructor(name, quantity, discount, price) {
        this.name = name;
        this.quantity = quantity;
        this.discount = discount;
        this.price = price;
    }

}

class Ui {
    
    addProduct(product) {
        const productList = document.getElementById('productList');
        const tbody = document.createElement('div');
        tbody.innerHTML = `
        <div class="card mb-2">
            <div class="card">
                <div class="row text-center">
                    <div class="col">
                    <a href="#" name="delet" class="btn btn-link"> Delet </a>
                    </div>
                    <div class="col mt-2"> 
                     ${product.name}
                    </div>
                    <div class="col mt-2">
                     ${product.quantity}
                    </div>
                    <div class="col mt-2">
                     ${product.discount}
                    </div>
                    <div class="col mt-2">
                     ${product.price}
                    </div>
                    <div class="col mt-2 totalprice">
                     ${ new Intl.NumberFormat().format((product.price * product.quantity) * (1 - (product.discount / 100)))}
                    </div>
                </div>
            </div> 
        </div>          
        `;
        productList.appendChild(tbody);
        // console.log(product);
        this.resetForm();
    }

    // summary() {
    //     var i=0;
    //     const totalPrice = document.querySelectorAll('div.totalprice');
    //     for (var item of totalPrice) {
    //         i++;
    //     }
    //     item = parseFloat(item.childNodes[0].textContent);
    //     // Almacena la información en sessionStorage
    //     var db = sessionStorage.setItem(i, item);
    // }

    resetForm() {
        document.getElementById('productForm').reset();
    }

    deletProduct(element) {
        if (element.name === 'delet') {
            // console.log(element.parentElement.parentElement.parentElement.parentElement.parentElement);
            element.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
            this.showMenssage('Product has Deleted', 'danger');
        }
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
        }, 1000);
    }
}

// DOM Event

document.getElementById('productForm')
    .addEventListener('submit', function(e) {
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;
        const discount = document.getElementById('discount').value;
        const price = document.getElementById('price').value;

        // console.log(name, quantity, discount, price);
        const product = new Product(name, quantity, discount, price);
        // console.log(product);
        const ui = new Ui();

        if (name === '' || quantity === '' || discount === '' || price === '') {
            ui.showMenssage('Complete Fields Please', 'warning');
        } else{
            ui.addProduct(product);
            ui.showMenssage('Product Added Successfuly', 'success');
            // ui.summary();
        }
        
        // Obtiene la información almacenada desde sessionStorage
        var data = sessionStorage;
        for (const item of data) {
        }
        console.log(data);
       
        
        e.preventDefault();
        ui.resetForm();
    });

document.getElementById('productList').addEventListener('click', function(e) {
    // console.log(e.target);
    const ui = new Ui();
    ui.deletProduct(e.target);
});